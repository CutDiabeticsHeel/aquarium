import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database/theatre.db");

async function getPlaybill() {
    return new Promise((resolve, reject) => {

        db.all(
            "SELECT id, performance, date FROM playbill",
            [],
            (err, rows) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            }
        );

    });
}

async function getPerformanceData(playbillData) {
    console.log("Отработала функция даты спектакля")

    const titles = playbillData.map(item => item.performance);

    return new Promise((resolve, reject) => {

        db.all(
            `SELECT * FROM performances WHERE title IN (${titles.map(() => "?").join(",")})`,
            titles,

            (err, rows) => {

                if (err) {
                    reject(err);
                    return;
                }

                const result = playbillData.map(item => {

                    const found = rows.find(
                        r => r.title === item.performance
                    );

                    return {
                        id: item.id,
                        performance: item.performance,
                        performance_id: found?.performance_id,
                        date: item.date,
                        age_limit: found?.age_limit,
                        image: found?.img1
                    };

                });

                resolve(result);
            }
        );

    });
}

async function getTroupe() {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT actor_id, first_name, last_name, role_name, portrait FROM troupe",
            [],
            (err, rows) => {
                if (err) reject(err);
                
                resolve(rows);
            }
        );
    });
}

async function getActorData(id) {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM troupe WHERE actor_id=?",
            [id],
            (err, rows) => {
                if (err) reject(err);
                
                resolve(rows);
            }
        );
    });
}

async function getPerformances() {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT performance_id, title, duration, age_limit, description, img1 FROM performances",
            [],
            (err, rows) => {
                if (err) reject(err);
                
                resolve(rows);
            }
        );
    });
}

async function getPerformancePageData(id){
    return new Promise((resolve, reject) =>{
        db.get(
            "SELECT title, origin, audience, info, img1, img2, img3 FROM performances WHERE performance_id=?",
            [id],
            (err, rows) =>{
                if (err) reject(err)

                resolve(rows)
            }
        )
    })
}

async function getHrefPerformanceForActor(id){
    return new Promise((resolve, reject) =>{
        db.all(
            "SELECT p.performance_id, p.title FROM performance_cast pc JOIN performances p ON p.performance_id = pc.performance_id WHERE pc.actor_id = ?",
            [id],
            (err,rows) => {
                if (err) reject(err)
                
                resolve(rows)
            }
        )
    })
}

async function getStarringListFromPerformance(id){
    return new Promise((resolve, reject) =>{
        db.all(
            "SELECT t.actor_id, t.first_name, t.last_name, t.portrait, role FROM performance_cast pc JOIN troupe t ON t.actor_id = pc.actor_id WHERE pc.performance_id = ?",
            [id],
            (err, rows) =>{
                if (err) reject(err)

                resolve(rows)
            }
        )
    })
}

async function getReviews(){
    return new Promise((resolve, reject) =>{
        db.all(
            "SELECT * FROM reviews WHERE approve ='true'",
            [],
            (err, rows) =>{
                if (err) reject(err)

                resolve(rows)
            }
        )
    })
}

async function addActorToDatabase(actorData, actorImages, actorPortrait){
    const actorImagesPath = actorImages.map(item => `/img/${item}`).join(',')
    const portraitPath = `/img/${actorPortrait}`;
    
    return new Promise((resolve, reject) => {
        db.run(
        `
        INSERT INTO troupe(
            first_name,
            last_name,
            role_name,
            patronymic,
            biografy,
            achievements,
            imgs,
            portrait
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            actorData.first_name,
            actorData.last_name,
            actorData.role_name,
            actorData.patronymic,
            actorData.biografy,
            actorData.achievements,
            actorImagesPath,
            portraitPath
        ],
        (err) => {
            if (err) return reject(err);
            resolve();
        }
    );
    })
}

async function deleteActorFromDatabase(firstName, lastName, patronymic){
    return new Promise((resolve, reject) =>{
        db.run(
            `DELETE FROM troupe WHERE first_name = ? AND last_name = ? AND patronymic = ?`,
            [firstName, lastName, patronymic],
            (err) => {
                    if (err) return reject(err);
                    resolve();
            }
        )
    })
}

async function findActors(lastName){
    return new Promise((resolve, reject) =>{
        db.all(
            `SELECT * FROM troupe WHERE last_name LIKE ?`,
            [`%${lastName}%`],
            (err, rows) =>{
                if (err) reject(err)

                resolve(rows)
            }
        )
    })
}

async function updateActorData(actorId, actorData, actorImages, actorPortrait) {
    const imagesPath = actorImages?.map(item => `/img/${item}`).join(",") || "";
    const portraitPath = actorPortrait ? `/img/${actorPortrait}` : "";

    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE troupe 
             SET 
                first_name = COALESCE(NULLIF(?, ''), first_name), 
                last_name = COALESCE(NULLIF(?, ''), last_name), 
                role_name= COALESCE(NULLIF(?, ''), role_name), 
                patronymic = COALESCE(NULLIF(?, ''), patronymic), 
                biografy= COALESCE(NULLIF(?, ''), biografy), 
                achievements= COALESCE(NULLIF(?, ''), achievements), 
                imgs= COALESCE(NULLIF(?, ''), imgs), 
                portrait = COALESCE(NULLIF(?, ''), portrait)
             WHERE actor_id = ?`,
            [
                actorData.first_name,
                actorData.last_name,
                actorData.role_name,
                actorData.patronymic,
                actorData.biografy,
                actorData.achievements,
                imagesPath,
                portraitPath,
                actorId
            ],
            function (err) {
                if (err) return reject(err);

                resolve({
                    updated: this.changes > 0,
                    changes: this.changes
                });
            }
        );
    });
}

async function getActorId(firstName, lastName, patronymic) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT actor_id
             FROM troupe
             WHERE first_name = ?
               AND last_name = ?
               AND patronymic = ?`,
            [firstName, lastName, patronymic],
            (err, actor) => {
                if (err) return reject(err);
                if (!actor) return reject(new Error("Актер не найден"));

                resolve(actor.actor_id);
            }
        );
    });
}

async function getPerformanceId(title) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT performance_id
             FROM performances
             WHERE title = ?`,
            [title],
            (err, performance) => {
                if (err) return reject(err);
                if (!performance) return reject(new Error("Спектакль не найден"));

                resolve(performance.performance_id);
            }
        );
    });
}

async function getCastRecord(performanceId, actorId) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT cast_id
             FROM performance_cast
             WHERE performance_id = ?
               AND actor_id = ?`,
            [performanceId, actorId],
            (err, row) => {
                if (err) return reject(err);

                resolve(row);
            }
        );
    });
}

async function updateCastRole(castId, role) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE performance_cast
             SET role = ?
             WHERE cast_id = ?`,
            [role, castId],
            function (err) {
                if (err) return reject(err);

                resolve();
            }
        );
    });
}

async function insertCast(performanceId, actorId, role) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO performance_cast (performance_id, actor_id, role)
             VALUES (?, ?, ?)`,
            [performanceId, actorId, role],
            function (err) {
                if (err) return reject(err);

                resolve(this.lastID);
            }
        );
    });
}

async function updateCastInfo(performanceTitle, role, firstName, lastName, patronymic) {
    const actorId = await getActorId(firstName, lastName, patronymic);
    const performanceId = await getPerformanceId(performanceTitle);

    const cast = await getCastRecord(performanceId, actorId);

    if (cast) {
        await updateCastRole(cast.cast_id, role);

        return {
            updated: true,
            castId: cast.cast_id,
            performanceId,
            actorId,
            role
        };
    }

    const castId = await insertCast(performanceId, actorId, role);

    return {
        updated: false,
        castId,
        performanceId,
        actorId,
        role
    };
}

export {getPlaybill, getPerformanceData, getTroupe, 
    getActorData, getPerformances, getPerformancePageData, 
    getHrefPerformanceForActor, getStarringListFromPerformance, getReviews,
    addActorToDatabase, deleteActorFromDatabase, findActors, updateActorData, updateCastInfo}