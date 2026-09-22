import Fastify from "fastify";
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
import csrfProtection from '@fastify/csrf-protection'
import ejs from 'ejs';
import path from "path";
import fs from "fs";
import argon2  from "argon2";
import { Temporal } from '@js-temporal/polyfill';

import {getPlaybill, getTroupe, getActorData, getPerformances, 
    getPerformancePageData, getHrefPerformanceForActor, getStarringListFromPerformance, 
    getReviews, SQLiteSessionStore, createReview, getReviewById, addLike, 
    incrementReviewLikes} from './database-function.js';
import adminRoutes from './admin-routes.js';
import { PAGES_META, performanceMeta, actorMeta} from "./og-content.js"
import {withWidth, SIZES} from "./image-utils.js"

let captchaConfig, secretConfig;

try {
    captchaConfig = JSON.parse(fs.readFileSync("./captcha.json", "utf-8"));
    
} catch (err) {
    console.error(err.message)
}
try {
    secretConfig = JSON.parse(fs.readFileSync("./admin-panel.json", "utf-8"));
} catch (err) {
    console.error(err.message)
}

const CAPTCHA_KEY = captchaConfig.captchaKey
const CAPTCHA_SITE_KEY = captchaConfig.captchaSiteKey
const SECRET_KEY = secretConfig.secret
const USER_NAME = secretConfig.username
const PASSWORD = await argon2.hash(secretConfig.password)
const monthMap = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
const sessionStore = new SQLiteSessionStore();


const app = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'SYS:standard'
            }
        }
    },
    trustProxy: "127.0.0.1",
    https: {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt')
    }
});

await app.register(cors);

await app.register(view, {
    engine: { ejs},
    root: path.join(process.cwd(), "ejs"),
    defaultContext: {
        withWidth,
        SIZES
    },
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
            formAction: ["'self'"],
            frameSrc: ["'self'", "https://yandex.ru" ,"https://www.google.com", "https://recaptcha.google.com"],
            scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
            connectSrc: [
                "'self'",
                "https://www.google.com",
                "https://*.google.com",
                "https://www.gstatic.com"
            ],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://www.gstatic.com"],
            fontSrc: ["'self'", "https://www.gstatic.com"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"]
        }
    }
})

await app.register(rateLimit, {
    max: 100,
    timeWindow: 5000,
    ban: 5,
    continueExceeding: true,
})

await app.register(session, {
    secret: SECRET_KEY,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    }
})

app.register(csrfProtection, {
    sessionPlugin: '@fastify/cookie'
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

app.get("/", async(request, reply) => {
    return reply.redirect("/welcome")
})

app.get("/welcome", async (request, reply) => {
    return reply.view("welcome.ejs", {
        headerClass: "unique-header",
        meta: PAGES_META.welcome
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
        performances: performancesData,
        meta: actorMeta(actorData)
    });

});

app.get("/collective-visit", async (request, reply) => {

    return reply.view("collective-visit.ejs", {
        meta: PAGES_META.collectiveVisit
    });

});

app.get("/drama-school", async (request, reply) => {

    return reply.view("drama-school.ejs", {
        meta: PAGES_META.daramaSchool
    });

});

app.get("/performance/:id", async (request, reply) => {
    const {id} = request.params;

    const performanceData = await getPerformancePageData(id)
    const starringList = await getStarringListFromPerformance(id)
    console.log(performanceData, starringList)

    return reply.view("performance.ejs", {
        performanceData: performanceData,
        starringList: starringList,
        meta: performanceMeta(performanceData, id)
    });

});

app.get("/playbill", async (request, reply) => {
    const playbillData = await getPlaybill();

    return reply.view("playbill.ejs", {
        performances: playbillData,
        meta: PAGES_META.playbill
    });

});

app.get("/repertoire", async (request, reply) => {
    const performancesData = await getPerformances();

    return reply.view("repertoire.ejs", {
        performances: performancesData,
        meta: PAGES_META.repertoire
    });

});

app.get("/reviews", async (request, reply) => {

    const reviewsData = await getReviews();
    const performances = await getPerformances()

    return reply.view("reviews.ejs", {
        reviews: reviewsData,
        performances: performances,
        key: CAPTCHA_SITE_KEY,
        meta: PAGES_META.reviews
    });

});

app.get("/tnt", async (request, reply) => {

    return reply.view("tnt.ejs", {
        meta: PAGES_META.tnt
    });

});

app.get("/troupe", async (request, reply) => {
    const troupeData = await getTroupe();

    return reply.view("troupe.ejs", {
        troupe: troupeData, 
        meta: PAGES_META.troupe
    });

});

app.get("/accessible-environment", async (request, reply) => {

    return reply.view("accessible-environment.ejs", {
        meta: PAGES_META.accessibility
    });

});

app.get("/admin", async (request, reply) => {
    return reply.view("admin.ejs", {});    
});

app.post("/reviews", {
    schema: {
        body: {
        type: 'object',
        required: ['name', "star", 'topicData', "review", 'g-recaptcha-response'],
        properties: {
            name: {type: "string", minLength: 5},
            topicData: {type: "string", minLength: 1},
            star: { type: 'integer', minimum: 1, maximum: 5 },
            review: {type: "string", minLength: 15},
            'g-recaptcha-response': { type: 'string' }
        },
        }
    },
    }, async (request, reply) =>{
        try {
            const { name, review, topicData, star, "g-recaptcha-response": captchaToken} = request.body;
            const captchaResponse = await fetch(
                "https://www.google.com/recaptcha/api/siteverify",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        secret: CAPTCHA_KEY,
                        response: captchaToken
                    })
                }
            );
            const captchaResult = await captchaResponse.json();

            if (
                !captchaResult.success ||
                captchaResult.action !== "submit" ||
                captchaResult.score < 0.5
            ) {
                return reply.code(400).send({
                    success: false,
                    message: "Капча не пройдена"
                });
            }
            
            const [topicTitle, topicText] = topicData.split(":");

            let date = Temporal.Now.plainDateISO();
            const month = monthMap[date.month - 1];
            const day = date.day;
            date = `${day} ${month}`;

            await createReview({
                name,
                date,
                text: review,
                likes: 0,
                topic: topicText,
                data: topicTitle,
                approve: 'false',
                star
            });

            return reply.send({ success: true });
        } catch (err) {
            return reply.code(500).send(err);
        }
})

app.post("/reviews/:id/like", async (request, reply) => {
    const reviewId = request.params.id;
    const ip = request.ip;

    try {
        const review = await getReviewById(reviewId);
        if (!review) {
            return reply.code(404).send({ success: false, message: "Отзыв не найден" });
        }

        try {
            await addLike(reviewId, ip);
        } catch (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return reply.send({ success: false, message: "Лайк уже поставлен" });
            }
            throw err;
        }

        await incrementReviewLikes(reviewId);

        const updated = await getReviewById(reviewId);
        return reply.send({ success: true, likes: updated.likes });

    } catch (err) {
        request.log.error(err);
        return reply.code(500).send({ success: false, message: "Внутренняя ошибка" });
    }
});

app.post("/admin", {
    config: {
        rateLimit: { max: 5, timeWindow: "15 minutes" }
    }
    }, async (request, reply) => {
    const {username, password} = request.body;
    const isValidPassword = await argon2.verify(PASSWORD, password)

    try {
        if (username === USER_NAME && isValidPassword) {
            request.session.user = {
                username: username
            };
        }
        return reply.redirect("/admin-panel")
    } catch (err) {
        return reply.code(401).send({ error: err });
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