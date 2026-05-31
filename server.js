import Fastify from "fastify";
import sqlite3 from "sqlite3";
import cors from "@fastify/cors";
import view from "@fastify/view";
import formbody from "@fastify/formbody";
import cookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static";
import ejs from 'ejs';
import path from "path";
import crypto from "crypto";
import { rejects } from "assert";
import { request } from "http";
import { Temporal } from '@js-temporal/polyfill';

const monthMap = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const app = Fastify({
    logger: true
});

const db = new sqlite3.Database("database/theatre.db");

await app.register(cors);

await app.register(view, {
    engine: {
        ejs
    },
    root: path.join(process.cwd(), "ejs")
});

await app.register(fastifyStatic, {
    root: path.join(process.cwd(), "assets"),
    prefix: "/"
});

await app.register(formbody)

await app.register(cookie);

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
            "SELECT origin, audience, info, img1, img2, img3 FROM performances WHERE performance_id=?",
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

const troupeData = await getTroupe();
const playbillData = await getPlaybill();
const playbillPerformanceData = await getPerformanceData(playbillData);
const performancesData = await getPerformances();


app.addHook("onRequest", async (request, reply) => {

    let token = request.cookies.userToken;

    if (!token) {

        token = crypto.randomUUID();

        reply.setCookie(
            "userToken",
            token,
            {
                path: "/",
                maxAge: 60 * 60 * 24 * 365
            }
        );
    }

    request.userToken = token;
});

app.get("/index", async (request, reply) => {

    return reply.view("index.ejs", {
    });

});

app.get("/actor/:id", async (request, reply) => {

    const {id} = request.params;
    const actorData = await getActorData(id)
    const performancesList = await getHrefPerformanceForActor(id)
    
    console.log(actorData, performancesList)

    return reply.view("actor.ejs", {
        actor: actorData,
        performancesList: performancesList
    });

});

app.get("/collective-visit", async (request, reply) => {

    return reply.view("collective-visit.ejs", {
    });

});

app.get("/drama-school", async (request, reply) => {

    return reply.view("drama-school.ejs", {
    });

});

app.get("/performance/:id", async (request, reply) => {

    const {id} = request.params;

    const performanceData = await getPerformancePageData(id)
    const starringList = await getStarringListFromPerformance(id)

    return reply.view("performance.ejs", {
        performanceData: performanceData,
        starringList: starringList
    });

});

app.get("/playbill", async (request, reply) => {

    return reply.view("playbill.ejs", {
        performances: playbillPerformanceData
    });

});

app.get("/repertoire", async (request, reply) => {

    return reply.view("repertoire.ejs", {
        performances: performancesData
    });

});

app.get("/reviews", async (request, reply) => {

    const reviewsData = await getReviews();
    const performances = await getPerformances()

    return reply.view("reviews.ejs", {
        reviews: reviewsData,
        performances: performances
    });

});

app.get("/tnt", async (request, reply) => {

    return reply.view("tnt.ejs", {
    });

});

app.get("/troupe", async (request, reply) => {

    return reply.view("troupe.ejs", {
        troupe: troupeData
    });

});


app.post("/reviews", (request, reply) =>{


    const {name, review, topicData} = request.body;
    const [topicTitle, topicText] = topicData.split(":")

    let date = Temporal.Now.plainDateISO();
    let month = monthMap[date.month - 1];
    let day = date.day;
    date = day + " " +  month

    db.run(
        `
        INSERT INTO reviews(
            name,
            date,
            text,
            likes,
            topic,
            data,
            approve
        )
        VALUES(?, ?, ?, ?, ?, ?, ?)
        `,
        [
            name,
            date,
            review,
            0,
            topicText,
            topicTitle,
            'false'
        ],
        (err) => {

            if (err) {
                return reply.code(500).send(err);
            }

            reply.send({
                success: true
            });
        }
    );
})

app.post("/reviews/:id/like", (request, reply) => {

    const reviewId = request.params.id;
    const token = request.userToken;
    console.log(reviewId, token)

    db.run(
        `
        INSERT INTO likes(
            review_id,
            user_id
        )
        VALUES(?, ?)
        `,
        [reviewId, token],
        function(err){

            if(err){

                return reply.send({
                    success: false,
                    message: "Лайк уже поставлен"
                });
            }

            db.run(
                `
                UPDATE reviews
                SET likes = likes + 1
                WHERE review_id = ?
                `,
                [reviewId],
                () => {

                    db.get(
                        `
                        SELECT likes
                        FROM reviews
                        WHERE review_id = ?
                        `,
                        [reviewId],
                        (err, row) => {

                            reply.send({
                                success: true,
                                likes: row.likes
                            });
                        }
                    );
                }
            );
        }
    );
});

try {

    await app.listen({
        port: 3000
    });

} catch (err) {

    app.log.error(err);
    process.exit(1);

}