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
            "SELECT t.actor_id, t.first_name, t.last_name, t.portrait, character_name FROM performance_cast pc JOIN troupe t ON t.actor_id = pc.actor_id WHERE pc.performance_id = ?",
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
    console.log(actorImagesPath)
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

export {getPlaybill, getPerformanceData, getTroupe, 
    getActorData, getPerformances, getPerformancePageData, 
    getHrefPerformanceForActor, getStarringListFromPerformance, getReviews,
    addActorToDatabase}