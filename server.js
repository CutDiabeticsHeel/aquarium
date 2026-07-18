import Fastify, { fastify } from "fastify";
import sqlite3 from "sqlite3";
import cors from "@fastify/cors";
import view from "@fastify/view";
import formbody from "@fastify/formbody";
import cookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static";
import compress from '@fastify/compress';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import session from '@fastify/session';
import multipart from "@fastify/multipart";
import recaptcha from "fastify-recaptcha";
import ejs from 'ejs';
import path from "path";
import fs from "fs";
import { pipeline } from "stream/promises";
import { rejects } from "assert";
import { request } from "http";
import { Temporal } from '@js-temporal/polyfill';

import {getPlaybill, getPerformanceData, getTroupe, 
    getActorData, getPerformances, getPerformancePageData, 
    getHrefPerformanceForActor, getStarringListFromPerformance, getReviews,
    addActorToDatabase, deleteActorFromDatabase, findActors, updateActorData,
    updateCastInfo, deletePerformanceFromDatabase, addOrUpdatePerformance, addPerformanceToPlaybill,
    deletePlaybillItem, updatePlaybillItem, getUnpublishedReviews,
    processReviews} from './database-function.js';
import console from "console";


const captchaConfig = JSON.parse(fs.readFileSync("./captcha.json", "utf-8"));
const secretConfig = JSON.parse(fs.readFileSync("./admin-panel.json", "utf-8"));

const CAPTCHA_KEY = captchaConfig.captchaKey
const SECRET_KEY = secretConfig.secret
const USER_NAME = secretConfig.username
const PASSWORD = secretConfig.password
const monthMap = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const app = Fastify({
    logger: true,
    https: {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt')
    }
});

const db = new sqlite3.Database("database/theatre.db");

await app.register(cors);

await app.register(view, {
    engine: { ejs},
    root: path.join(process.cwd(), "ejs")
});

await app.register(compress, {
    encodings: ['zstd', 'br', 'gzip'] 
});

await app.register(fastifyStatic, {
    root: path.join(process.cwd(), "assets"),
    prefix: "/"
});

await app.register(formbody)
await app.register(cookie);
await app.register(multipart, {
    limits: {
        fileSize: 20 * 1024 * 1024,
        files: 15
    }
});

await app.register(helmet, {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            frameSrc: ["'self'", "https://yandex.ru" ,"https://www.google.com", "https://recaptcha.google.com"],
            scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
            connectSrc: [
                "'self'",
                "https://www.google.com",
                "https://*.google.com",
                "https://www.gstatic.com"
            ]
        }
    }
})

await app.register(rateLimit, {
    max: 100,
    timeWindow: 5000,
    ban: 5,
    continueExceeding: true,
})

await app.register(recaptcha, {
    recaptcha_secret_key: CAPTCHA_KEY,
    reply: true
})

await app.register(session, {
    secret: SECRET_KEY,
    cookie: {
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }
})


app.get("/welcome", async (request, reply) => {

    return reply.view("welcome.ejs", {
    });

});

app.get("/actor/:id", async (request, reply) => {
    const {id} = request.params;
    
    const actorData = await getActorData(id)
    const performancesList = await getHrefPerformanceForActor(id)
    const performancesData = await getPerformances();

    return reply.view("actor.ejs", {
        actor: actorData,
        performancesList: performancesList,
        performances: performancesData
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
    const playbillData = await getPlaybill();
    const playbillPerformanceData = await getPerformanceData(playbillData);

    return reply.view("playbill.ejs", {
        performances: playbillPerformanceData
    });

});

app.get("/repertoire", async (request, reply) => {
    const performancesData = await getPerformances();

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
    
    const troupeData = await getTroupe();

    return reply.view("troupe.ejs", {
        troupe: troupeData
    });

});

app.get("/admin", async (request, reply) => {

    return reply.view("admin.ejs", {

    });

});

app.get("/admin-panel", async (request, reply) => {

    if (!request.session.user) {
        return reply.redirect('/admin');
    }
    const unpublishedReviews = await getUnpublishedReviews()
    const playbillData = await getPlaybill();
    
    return reply.view("admin-panel.ejs", {
        playbillData: playbillData,
        unpublishedReviews: unpublishedReviews
    });

});

app.get("/find-actor", async (request, reply) => {
    const { lastName  } = request.query;
    const actors = await findActors(lastName)

    if (!request.session.user) {
        return reply.redirect('/admin');
    }

    return reply.view("search-result.ejs", {
        actors: actors
    });
});

app.get("/edit-actor/:id", async (request, reply) => {
    const {id} = request.params;

    if (!request.session.user) {
        return reply.redirect('/admin');
    }

    return reply.view("update-actor.ejs", {
        id
    });
});

app.get("/update-playbill/:id", async (request, reply) => {
    const {id} = request.params;
    const playbillData = await getPlaybill();
    const playbillItemResult = playbillData.find(item => item.id === Number(id))

    if (!request.session.user) {
        return reply.redirect('/admin');
    }

    return reply.view("update-playbill.ejs", {
        playbillData: playbillItemResult,
        id
    });
})


app.post("/reviews", (request, reply) =>{
    const {name, review, topicData, star} = request.body;
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
            approve,
            star
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            name,
            date,
            review,
            0,
            topicText,
            topicTitle,
            'false',
            star
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

app.post("/admin", (request, reply) => {
    const {username, password} = request.body;
    if (username === USER_NAME && password === PASSWORD) {
        request.session.user = {
            username: username,
            password: password
        };
        return reply.redirect("/admin-panel")
    } else {
        return reply.code(401).send({ error: "Неверный логин или пароль" });
    }
})

app.post("/reviews/:id/like", (request, reply) => {
    const reviewId = request.params.id;
    const ip = request.ip;

    db.run(
        `
        INSERT INTO likes(review_id, user_ip)
        VALUES(?, ?)
        `,
        [reviewId, ip],
        function(err) {

            if (err) {
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

app.post("/add-actor", async (request, reply) => {
    const actorData = {};
    const actorImages = [];
    let actorPortrait = null;
    try {
        for await (const part of request.parts()) {
            if (part.type === 'file') {
                if (!part.filename) continue;

                const filename = part.filename;
                await pipeline(part.file, fs.createWriteStream('./assets/img/' + filename));

                if (part.fieldname === 'imgs') actorImages.push(filename);
                else actorPortrait = filename;
            } else {
                actorData[part.fieldname] = part.value;
            }
        }
        await addActorToDatabase(actorData, actorImages, actorPortrait);
        reply.redirect("/admin-panel");
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
})

app.post("/delete-actor", async(request, reply) =>{
    try {
        const {firstName, lastName, patronymic} = request.body;
        console.log(firstName, lastName, patronymic)
        await deleteActorFromDatabase(firstName, lastName, patronymic)
        reply.redirect("/admin-panel");
    } catch (err){
        reply.code(500).send({ error: err.message });
    }
})

app.post("/update-actor", async (request, reply) => {
    const { id } = request.query;
    const actorData = {};
    const actorImages = [];
    let actorPortrait = null;
    try {
        for await (const part of request.parts()) {
            if (part.type === 'file') {
                if (!part.filename) continue;

                const filename = part.filename;
                await pipeline(part.file, fs.createWriteStream('./assets/img/' + filename));

                if (part.fieldname === 'imgs') actorImages.push(filename);
                else actorPortrait = filename;
            } else {
                actorData[part.fieldname] = part.value;
            }
        }
        await updateActorData(id, actorData, actorImages, actorPortrait);
        reply.redirect("/admin-panel");
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
})

app.post("/update-cast", async (request, reply) => {
    try {
        const {performanceTitle, role, firstName, lastName, patronymic} = request.body;
        await updateCastInfo(performanceTitle, role, firstName, lastName, patronymic)
        reply.redirect("/admin-panel");
    } catch (err){
        reply.code(500).send({ error: err.message });
    }
})

app.post("/delete-performance", async (request, reply) => {
    try {
        const {title} = request.body;
        await deletePerformanceFromDatabase(title)
        reply.redirect("/admin-panel")
    } catch {
        reply.code(500).send({ error: err.message });
    }
})

app.post("/redact-performance", async (request, reply) => {
    const performanceData = {};
    const performanceImages = [];
    let titleImage = null;
    try {
        for await (const part of request.parts()) {
            if (part.type === 'file') {
                if (!part.filename) continue;

                const filename = part.filename;
                await pipeline(part.file, fs.createWriteStream('./assets/img/' + filename));

                if (part.fieldname === 'imgs') performanceImages.push(filename);
                else titleImage = filename;
            } else {
                performanceData[part.fieldname] = part.value;
            }
        }
        console.log(performanceData, performanceImages, titleImage)
        await addOrUpdatePerformance(performanceData, performanceImages, titleImage);
        reply.redirect("/admin-panel");
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
})

app.post("/add-playbill", async(request, reply) =>{
    try {
        const {title, date, time} = request.body
        console.log(title, date, time)
        await addPerformanceToPlaybill(title, date, time)
        reply.redirect("/admin-panel")
    } catch (error) {
        reply.code(500).send({ error: err.message });
    }
    
})

app.post("/delete-playbill", async(request, reply) =>{
    try {
        const {id} = request.body
        await deletePlaybillItem(id)
        reply.redirect("/admin-panel")
    } catch (error) {
        reply.code(500).send({ error: err.message });
    }
})

app.post("/update-playbill", async (request, reply) =>{
    const { id } = request.query;
    const {title, date, time} = request.body;
    console.log(id, title, date, time)
    try {
        console.log(id, title, date, time)
        await updatePlaybillItem(Number(id), title, date, time);
        reply.redirect("/admin-panel");
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
})

app.post("/approve-review", async (request, reply) =>{
    const reviewData = { ...request.body}
    try {
        await processReviews(reviewData)
        reply.redirect("/admin-panel")
    } catch(err) {
        reply.code(500).send({ error: err.message });
    }
})

app.setErrorHandler((error, request, reply) =>{
    const code = error.statusCode || 500

    if (code === 400) {
        return reply.status(400).view("/partials/error-page.ejs", {
            errorCode: "400",
            errorText: "Bad Request: Неверный запрос"
        })
    }
    if (code === 403) {
        return reply.status(403).view("/partials/error-page.ejs", {
            errorCode: "403",
            errorText: "Forbidden: Доступ запрещен"
        })
    }
    if (code === 404) {
        return reply.status(404).view("/partials/error-page.ejs", {
            errorCode: "404",
            errorText: "Not Found: Не найдено"
        })
    }
    if (code === 408) {
        return reply.status(408).view("/partials/error-page.ejs", {
            errorCode: "408",
            errorText: "Request Timeout: Время ожидания истекло"
        })
    }
})

try {

    await app.listen({
        port: 3000,
        host: "0.0.0.0"
    });

} catch (err) {

    app.log.error(err);
    process.exit(1);

}