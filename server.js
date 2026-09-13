import Fastify from "fastify";
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
import { Temporal } from '@js-temporal/polyfill';

import {getPlaybill, getPerformanceData, getTroupe, 
    getActorData, getPerformances, getPerformancePageData, 
    getHrefPerformanceForActor, getStarringListFromPerformance, getReviews} from './database-function.js';
import adminRoutes from './admin-routes.js';


const captchaConfig = JSON.parse(fs.readFileSync("./captcha.json", "utf-8"));
const secretConfig = JSON.parse(fs.readFileSync("./admin-panel.json", "utf-8"));

const CAPTCHA_KEY = captchaConfig.captchaKey
const SECRET_KEY = secretConfig.secret
const USER_NAME = secretConfig.username
const PASSWORD = secretConfig.password
const monthMap = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const app = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'SYS:standard'
            }
        }
    },
    trustProxy: true,
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

function wantsJson(request) {
    const accept = request.headers.accept || "";
    return accept.includes("application/json") && !accept.includes("text/html");
}

function shutdownAndExit() {
  app.close(() => {
    process.exit(1);
  });
  setTimeout(() => process.exit(1), 5000);
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdownAndExit();
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  throw reason;
});

app.get("/welcome", async (request, reply) => {

    return reply.view("welcome.ejs", {
        headerClass: "unique-header",
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

    return reply.view("tnt.ejs", {});

});

app.get("/troupe", async (request, reply) => {
    const troupeData = await getTroupe();

    return reply.view("troupe.ejs", {
        troupe: troupeData
    });

});

app.get("/accessible-environment", async (request, reply) => {

    return reply.view("accessible-environment.ejs", {
    });

});

app.get("/admin", async (request, reply) => {
    return reply.view("admin.ejs", {});    
});

app.post("/reviews", (request, reply) =>{
    const {name, review, topicData, star} = request.body;
    const [topicTitle, topicText] = topicData.split(":");

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

app.post("/reviews/:id/like", (request, reply) => {
    const reviewId = request.params.id;
    const ip = request.ip;

    db.get(
        `SELECT review_id FROM reviews WHERE review_id = ?`,
        [reviewId],
        (err, review) => {
            if (err) {
                request.log.error(err);
                return reply.code(500).send({ success: false, message: "Внутренняя ошибка" });
            }
            if (!review) {
                return reply.code(404).send({ success: false, message: "Отзыв не найден" });
            }
            db.run(
                `INSERT INTO likes(review_id, user_ip) VALUES(?, ?)`,
                [reviewId, ip],
                function (err) {
                    if (err) {
                        if (err.code === 'SQLITE_CONSTRAINT') {
                            return reply.send({
                                success: false,
                                message: "Лайк уже поставлен"
                            });
                        }
                        return reply.code(500).send({
                            success: false,
                            message: "Внутренняя ошибка"
                        });
                    }
                    db.run(
                        `UPDATE reviews SET likes = likes + 1 WHERE review_id = ?`,
                        [reviewId],
                        function (err) {
                            if (err) {
                                request.log.error(err);
                                return reply.code(500).send({ success: false, message: "Внутренняя ошибка" });
                            }
                            if (this.changes === 0) {
                                return reply.code(404).send({ success: false, message: "Отзыв не найден" });
                            }
                            db.get(
                                `SELECT likes FROM reviews WHERE review_id = ?`,
                                [reviewId],
                                (err, row) => {
                                    if (err || !row) {
                                        request.log.error(err);
                                        return reply.code(500).send({ success: false, message: "Внутренняя ошибка" });
                                    }
                                    reply.send({ success: true, likes: row.likes });
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});

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

await app.register(adminRoutes);

app.setNotFoundHandler((request, reply) => {
    if (wantsJson(request)) {
        return reply.status(404).send({
            errorCode: 404,
            errorText: error.message ?? "Internal Server Error"
        })
    }

    return reply.status(404).view("/partials/error-page.ejs", {
        errorCode: "404",
        errorText: "Not Found: Не найдено"
    });
});

app.setErrorHandler((error, request, reply) =>{
    const code = error.statusCode >= 400 && error.statusCode < 500 ? error.statusCode : 500;
    request.log.error({ err: error }, "request failed");

    if (wantsJson(request)) {
        return reply.status(code).send({
            errorCode: String(code),
            errorText: error.message ?? "Internal Server Error"
        })
    }

    return reply.status(code).view("/partials/error-page.ejs", {
        errorCode: String(code),
        errorText: error ?? "Internal Server Error"
    })
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