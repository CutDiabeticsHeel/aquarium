import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("database/theatre.db");

db.exec(`PRAGMA journal_mode = WAL`);
db.exec(`PRAGMA busy_timeout = 4000`);
db.exec(`PRAGMA foreign_keys = ON`);

const IMAGE_TABLES = {
    actor:       { table: "actor_images",       fk: "actor_id" },
    performance: { table: "performance_images", fk: "performance_id" }
};

async function getPlaybill() {
    return db.prepare(
        `SELECT pb.id, pb.date, pb.time, p.performance_id, p.title, p.title_image, p.age_limit
         FROM playbill pb
         JOIN performances p ON p.performance_id = pb.performance_id`
    ).all();
}

async function getTroupe() {
    return db.prepare(
        "SELECT actor_id, first_name, last_name, role_name, portrait FROM troupe"
    ).all();
}

async function getActorData(id) {
    const row = db.prepare("SELECT * FROM troupe WHERE actor_id=?").get(id);
    if (!row) return row;

    return { ...row, imgs: getImages("actor", row.actor_id) };
}

async function getPerformances() {
    const rows = db.prepare(
        "SELECT performance_id, title, duration, age_limit, description, title_image FROM performances"
    ).all();
 
    return rows.map(row => ({
        ...row,
        imgs: getImages("performance", row.performance_id)
    }));
}

async function getPerformancePageData(id) {
    const row = db.prepare(
        "SELECT title, origin, audience, info, title_image FROM performances WHERE performance_id=?"
    ).get(id);
    if (!row) return row;
 
    return { ...row, imgs: getImages("performance", id) };
}

async function getHrefPerformanceForActor(id) {
    return db.prepare(
        "SELECT p.performance_id, p.title FROM performance_cast pc JOIN performances p ON p.performance_id = pc.performance_id WHERE pc.actor_id = ?"
    ).all(id);
}

async function getStarringListFromPerformance(id) {
    return db.prepare(
        "SELECT t.actor_id, t.first_name, t.last_name, t.portrait, role FROM performance_cast pc JOIN troupe t ON t.actor_id = pc.actor_id WHERE pc.performance_id = ?"
    ).all(id);
}

async function getReviews() {
    return db.prepare("SELECT * FROM reviews WHERE approve = 'true'").all();
}

async function getUnpublishedReviews() {
    return db.prepare("SELECT * FROM reviews WHERE approve = 'false'").all();
}

function appendImages(kind, ownerId, fileNames) {
    if (!fileNames || fileNames.length === 0) return;
 
    const { table, fk } = IMAGE_TABLES[kind];
 
    const { maxOrder } = db.prepare(
        `SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM ${table} WHERE ${fk} = ?`
    ).get(ownerId);
 
    const insert = db.prepare(
        `INSERT OR IGNORE INTO ${table} (${fk}, url, sort_order) VALUES (?, ?, ?)`
    );
 
    let order = maxOrder;
    for (const name of fileNames) {
        order += 10;
        insert.run(ownerId, `/img/${name}`, order);
    }
}

function getImages(kind, ownerId) {
    const { table, fk } = IMAGE_TABLES[kind];
 
    return db.prepare(
        `SELECT url FROM ${table} WHERE ${fk} = ? ORDER BY sort_order, id`
    ).all(ownerId).map(row => row.url);
}

async function addActorToDatabase(actorData, actorImages, actorPortrait) {
    const portraitPath = `/img/${actorPortrait}`;
    db.exec("BEGIN IMMEDIATE");
    
    try {
        const result = db.prepare(
            `
            INSERT INTO troupe(
                first_name,
                last_name,
                role_name,
                patronymic,
                biography,
                achievements,
                portrait
            )
            VALUES(?, ?, ?, ?, ?, ?, ?)
            `
        ).run(
            actorData.first_name,
            actorData.last_name,
            actorData.role_name,
            actorData.patronymic,
            actorData.biography,
            actorData.achievements,
            portraitPath
        );

        appendImages("actor", result.lastInsertRowid, actorImages);

        db.exec("COMMIT");
    } catch (err) {
        db.exec("ROLLBACK");
        throw err;
    }

}

async function deleteActorFromDatabase(firstName, lastName, patronymic) {
    db.prepare(
        `DELETE FROM troupe WHERE first_name = ? AND last_name = ? AND patronymic = ?`
    ).run(firstName, lastName, patronymic);
}

async function findActors(lastName) {
    return db.prepare(
        `SELECT * FROM troupe WHERE last_name LIKE ?`
    ).all(`%${lastName}%`);
}

async function updateActorData(actorId, actorData, actorImages, actorPortrait) {
    const id = Number(actorId);
    const portraitPath = actorPortrait ? `/img/${actorPortrait}` : "";
 
    db.exec("BEGIN IMMEDIATE");
    try {
        const result = db.prepare(
            `UPDATE troupe
             SET
                first_name = COALESCE(NULLIF(?, ''), first_name),
                last_name = COALESCE(NULLIF(?, ''), last_name),
                role_name = COALESCE(NULLIF(?, ''), role_name),
                patronymic = COALESCE(NULLIF(?, ''), patronymic),
                biography = COALESCE(NULLIF(?, ''), biography),
                achievements = COALESCE(NULLIF(?, ''), achievements),
                portrait = COALESCE(NULLIF(?, ''), portrait)
             WHERE actor_id = ?`
        ).run(
            actorData.first_name,
            actorData.last_name,
            actorData.role_name,
            actorData.patronymic,
            actorData.biography,
            actorData.achievements,
            portraitPath,
            id
        );

        if (result.changes > 0) {
            appendImages("actor", id, actorImages);
        }
 
        db.exec("COMMIT");
 
        return {
            updated: result.changes > 0,
            changes: result.changes
        };
    } catch (err) {
        db.exec("ROLLBACK");
        throw err;
    }
}

async function getActorId(firstName, lastName, patronymic) {
    const actor = db.prepare(
        `SELECT actor_id
         FROM troupe
         WHERE first_name = ?
           AND last_name = ?
           AND patronymic = ?`
    ).get(firstName, lastName, patronymic);

    if (!actor) throw new Error("Актер не найден");

    return actor.actor_id;
}

async function getPerformanceId(title) {
    const performance = db.prepare(
        `SELECT performance_id
         FROM performances
         WHERE title = ?`
    ).get(title);

    if (!performance) throw new Error("Спектакль не найден");

    return performance.performance_id;
}

async function getCastRecord(performanceId, actorId) {
    return db.prepare(
        `SELECT cast_id
         FROM performance_cast
         WHERE performance_id = ?
           AND actor_id = ?`
    ).get(performanceId, actorId);
}

async function updateCastRole(castId, role) {
    db.prepare(
        `UPDATE performance_cast
         SET role = ?
         WHERE cast_id = ?`
    ).run(role, castId);
}

async function insertCast(performanceId, actorId, role) {
    const result = db.prepare(
        `INSERT INTO performance_cast (performance_id, actor_id, role)
         VALUES (?, ?, ?)`
    ).run(performanceId, actorId, role);

    return result.lastInsertRowid;
}

async function updateCastInfo(performanceTitle, role, firstName, lastName, patronymic) {
    db.exec('BEGIN IMMEDIATE TRANSACTION');

    try {
        const actorId = await getActorId(firstName, lastName, patronymic);
        const performanceId = await getPerformanceId(performanceTitle);
        const cast = await getCastRecord(performanceId, actorId);
        let result;

        if (cast) {
            await updateCastRole(cast.cast_id, role);
            result = {
                updated: true,
                castId: cast.cast_id,
                performanceId,
                actorId,
                role
            };
        } else {
            const castId = await insertCast(performanceId, actorId, role);
            result = {
                updated: false,
                castId,
                performanceId,
                actorId,
                role
            };
        }
        db.exec('COMMIT');
        return result;
    } catch (err) {
        db.exec('ROLLBACK');
        throw err;
    }
}

async function deletePerformanceFromDatabase(title) {
    db.prepare(`DELETE FROM performances WHERE title = ?`).run(title);
}

async function updatePerformance(performanceData, performanceImages, titleImage) {
    const titleImagePath = titleImage ? `/img/${titleImage}` : "";
    const performanceId = await getPerformanceId(performanceData.title);
 
    const result = db.prepare(
        `UPDATE performances
        SET
            duration = COALESCE(NULLIF(?, ''), duration),
            age_limit = COALESCE(NULLIF(?, ''), age_limit),
            description = COALESCE(NULLIF(?, ''), description),
            origin = COALESCE(NULLIF(?, ''), origin),
            audience = COALESCE(NULLIF(?, ''), audience),
            info = COALESCE(NULLIF(?, ''), info),
            title_image = COALESCE(NULLIF(?, ''), title_image)
        WHERE performance_id = ?`
    ).run(
        performanceData.duration,
        performanceData.ageLimit,
        performanceData.description,
        performanceData.origin,
        performanceData.audience,
        performanceData.info,
        titleImagePath,
        performanceId
    );
 
    appendImages("performance", performanceId, performanceImages);
 
    return {
        updated: true,
        changes: result.changes
    };
}

async function addPerformance(performanceData, performanceImages, titleImage) {
    const titleImagePath = titleImage ? `/img/${titleImage}` : "";
 
    const result = db.prepare(
        `INSERT INTO performances(
            title,
            duration,
            age_limit,
            description,
            origin,
            audience,
            info,
            title_image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
        performanceData.title,
        performanceData.duration,
        performanceData.ageLimit,
        performanceData.description,
        performanceData.origin,
        performanceData.audience,
        performanceData.info,
        titleImagePath
    );
 
    appendImages("performance", result.lastInsertRowid, performanceImages);
 
    return result.lastInsertRowid;
}

async function addOrUpdatePerformance(performanceData, performanceImages, titleImage) {
    db.exec('BEGIN IMMEDIATE TRANSACTION');

    try {
        const row = db.prepare(
            `SELECT 1 FROM performances WHERE title = ?`
        ).get(performanceData.title);

        if (row) {
            await updatePerformance(performanceData, performanceImages, titleImage);
        } else {
            await addPerformance(performanceData, performanceImages, titleImage);
        }

        db.exec('COMMIT');
    } catch (err) {
        db.exec('ROLLBACK');
        throw err;
    }
}

async function addPerformanceToPlaybill(title, date, time) {
    const performanceId = await getPerformanceId(title);

    const result = db.prepare(
        `INSERT INTO playbill (performance_id, date, time) VALUES (?, ?, ?)`
    ).run(performanceId, date, time);

    return {
        id: result.lastInsertRowid,
        title: title,
        date: date,
        time: time,
        message: 'Спектакль успешно добавлен'
    };
}

async function deletePlaybillItem(id) {
    const result = db.prepare(`DELETE FROM playbill WHERE id = ?`).run(id);

    return {
        success: true,
        deletedId: id,
        changes: result.changes
    };
}

async function updatePlaybillItem(id, title, date, time) {
    const result = db.prepare(
        `UPDATE playbill
        SET 
            performance = COALESCE(NULLIF(?, ''), performance),
            date = COALESCE(NULLIF(?, ''), date),
            time = COALESCE(NULLIF(?, ''), time)
        WHERE id = ?`
    ).run(title, date, time, id);

    if (result.changes === 0) throw new Error('Not found');

    return { updated: true };
}

async function processReviews(reviews) {
    if (!reviews || typeof reviews !== "object") {
        throw new Error("Ошибка при валидации отзывов");
    }

    const approveStmt = db.prepare(`UPDATE reviews SET approve = 'true' WHERE review_id = ?`);
    const deleteStmt = db.prepare(`DELETE FROM reviews WHERE review_id = ?`);

    db.exec('BEGIN');
    try {
        for (const [id, decision] of Object.entries(reviews)) {
            if (decision === "yes") {
                approveStmt.run(id);
            } else if (decision === "no") {
                deleteStmt.run(id);
            }
        }
        db.exec('COMMIT');
    } catch (err) {
        db.exec('ROLLBACK');
        throw err;
    }
}

async function createReview({ name, date, text, likes, topic, data, approve, star }) {
    const result = db.prepare(
        `
        INSERT INTO reviews(
            name,
            date,
            text,
            likes,
            topic,
            data,
            approve,
            star
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `
    ).run(name, date, text, likes, topic, data, approve, star);

    return { id: result.lastInsertRowid };
}

async function getReviewById(reviewId) {
    return db.prepare(
        `SELECT review_id, likes FROM reviews WHERE review_id = ?`
    ).get(reviewId);
}

async function addLike(reviewId, ip) {
    db.prepare(
        `INSERT INTO likes(review_id, user_ip) VALUES(?, ?)`
    ).run(reviewId, ip);
}

async function incrementReviewLikes(reviewId) {
    const result = db.prepare(
        `UPDATE reviews SET likes = likes + 1 WHERE review_id = ?`
    ).run(reviewId);

    if (result.changes === 0) throw new Error('Not found');
}

class SQLiteSessionStore {
    set(sessionId, session, callback) {
        const data = JSON.stringify(session);
        try {
            db.prepare(
                `
                INSERT INTO sessions (session_id, data)
                VALUES (?, ?)
                ON CONFLICT(session_id)
                DO UPDATE SET data = excluded.data
                `
            ).run(sessionId, data);
            callback(null);
        } catch (err) {
            callback(err);
        }
    }

    get(sessionId, callback) {
        try {
            const row = db.prepare(
                "SELECT data FROM sessions WHERE session_id = ?"
            ).get(sessionId);

            if (!row) {
                return callback(null, null);
            }

            callback(null, JSON.parse(row.data));
        } catch (err) {
            callback(err);
        }
    }

    destroy(sessionId, callback) {
        try {
            db.prepare("DELETE FROM sessions WHERE session_id = ?").run(sessionId);
            callback(null);
        } catch (err) {
            callback(err);
        }
    }
}

export {
    getPlaybill, getTroupe,
    getActorData, getPerformances, getPerformancePageData,
    getHrefPerformanceForActor, getStarringListFromPerformance, getReviews,
    addActorToDatabase, deleteActorFromDatabase, findActors, updateActorData, updateCastInfo,
    deletePerformanceFromDatabase, addOrUpdatePerformance, addPerformanceToPlaybill,
    deletePlaybillItem, updatePlaybillItem, getUnpublishedReviews, processReviews,
    createReview, getReviewById, addLike, incrementReviewLikes, SQLiteSessionStore
};