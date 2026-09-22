import {getPlaybill, addActorToDatabase, deleteActorFromDatabase, findActors, updateActorData,
    updateCastInfo, deletePerformanceFromDatabase, addOrUpdatePerformance, addPerformanceToPlaybill,
    deletePlaybillItem, updatePlaybillItem, getUnpublishedReviews, processReviews} from './database-function.js';
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs";
import { pipeline } from "stream/promises";
import {PAGES_META} from "./og-content.js"
import { generateResponsiveImages } from './min-images.js';

const ALLOWED_TYPES = {
    ".jpg": ["image/jpeg"],
    ".jpeg": ["image/jpeg"],
    ".png": ["image/png"],
    ".webp": ["image/webp"],
};

function safeExtFromMime(filename, mimetype) {
    const ext = path.extname(filename).toLowerCase();
    if (!ALLOWED_TYPES[ext]) return null;
    if (!ALLOWED_TYPES[ext].includes(mimetype)) return null;
    return ext;
}

async function parseMultipartFields(request) {
    const data = {};
    for await (const part of request.parts()) {
        if (part.type === 'field') {
            data[part.fieldname] = part.value;
        } else {
            part.file.resume();
        }
    }
    return data;
}

async function adminRoutes(app, opts) {

    app.addHook('onRequest', async (request, reply) => {
        if (!request.session.user) {
            return reply.redirect('/admin');
        }
    });

    app.get("/admin-panel",async (request, reply) => {
        const token = await reply.generateCsrf();
        const unpublishedReviews = await getUnpublishedReviews()
        const playbillData = await getPlaybill();
        
        return reply.view("admin-panel.ejs", {
            csrfToken: token,
            playbillData: playbillData,
            unpublishedReviews: unpublishedReviews,
            meta: PAGES_META
        });
    });
    
    app.get("/find-actor", async (request, reply) => {
        const token = await reply.generateCsrf();
        const { lastName  } = request.query;
        const actors = await findActors(lastName)
    
        return reply.view("search-result.ejs", {
            csrfToken: token,
            actors: actors,
            meta: PAGES_META
        });
    });
    
    app.get("/edit-actor/:id", async (request, reply) => {
        const token = await reply.generateCsrf();
        const {id} = request.params;
    
        return reply.view("update-actor.ejs", {
            csrfToken: token,
            id,
            meta: PAGES_META
        });
    });
    
    app.get("/update-playbill/:id", async (request, reply) => {
        const token = await reply.generateCsrf();
        const {id} = request.params;
        const playbillData = await getPlaybill();
        const playbillItemResult = playbillData.find(item => item.id === Number(id))
    
        return reply.view("update-playbill.ejs", {
            csrfToken: token,
            playbillData: playbillItemResult,
            id,
            meta: PAGES_META
        });
    })  
    
    app.post("/add-actor",{
        onRequest: app.csrfProtection
    }, async (request, reply) => {
        const actorData = {};
        const actorImages = [];
        let actorPortrait = null;
        const writtenFiles = [];

        try {
            for await (const part of request.parts()) {
                if (part.type === 'file') {
                    if (!part.filename) {
                        part.file.resume();
                        continue;
                    }

                    const validFile = safeExtFromMime(part.filename, part.mimetype);
                    if (!validFile) {
                        part.file.resume();
                        continue;
                    }
    
                    const fileName = crypto.randomBytes(6).toString('base64url') + validFile;
                    const destPath = path.resolve('./assets/img/origin/', fileName);

                    await pipeline(part.file, fs.createWriteStream(destPath));
                    writtenFiles.push(destPath);
                    await generateResponsiveImages(destPath);
    
                    if (part.fieldname === 'imgs') actorImages.push(fileName);
                    else actorPortrait = fileName;
                } else {
                    actorData[part.fieldname] = part.value;
                }
            }
            await addActorToDatabase(actorData, actorImages, actorPortrait);
            reply.redirect("/admin-panel");
        } catch (err) {
            for (const f of writtenFiles) {
                fs.promises.unlink(f).catch(() => {});
            }
            console.error(err)
            reply.code(500).send({ message: "Ошибка при добавлении актера" });
        }
    })
    
    app.post("/delete-actor",{
        onRequest: app.csrfProtection
    },  async(request, reply) =>{
        try {
            const {firstName, lastName, patronymic} = await parseMultipartFields(request);
            await deleteActorFromDatabase(firstName, lastName, patronymic)
            reply.redirect("/admin-panel");
        } catch (err){
            console.error(err)
            reply.code(500).send({ message: "Ошибка при удалении актера" });
        }
    })
    
    app.post("/update-actor", {
        onRequest: app.csrfProtection
    }, async (request, reply) => {
        const { id } = request.query;
        const actorData = {};
        const actorImages = [];
        let actorPortrait = null;
        const writtenFiles = [];

        try {
            for await (const part of request.parts()) {
                if (part.type === 'file') {
                    if (!part.filename) {
                        part.file.resume();
                        continue;
                    }
                    const validFile = safeExtFromMime(part.filename, part.mimetype);
                    if (!validFile) {
                        part.file.resume();
                        continue;
                    }
    
                    const fileName = crypto.randomBytes(6).toString('base64url') + validFile;
                    const destPath = path.resolve('./assets/img/origin/', fileName);

                    await pipeline(part.file, fs.createWriteStream(destPath));
                    writtenFiles.push(destPath);
                    await generateResponsiveImages(destPath);
    
                    if (part.fieldname === 'imgs') actorImages.push(fileName);
                    else actorPortrait = fileName;
                } else {
                    actorData[part.fieldname] = part.value;
                }
            }
            await updateActorData(id, actorData, actorImages, actorPortrait);
            reply.redirect("/admin-panel");
        } catch (err) {
            for (const f of writtenFiles) {
                fs.promises.unlink(f).catch(() => {});
            }
            console.error(err)
            reply.code(500).send({ message: "Ошибка при обновлении актера" });
        }
    })
    
    app.post("/update-cast", {
        onRequest: app.csrfProtection
    }, async (request, reply) => {
        try {
            const {performanceTitle, role, firstName, lastName, patronymic} = await parseMultipartFields(request);
            await updateCastInfo(performanceTitle, role, firstName, lastName, patronymic)
            reply.redirect("/admin-panel");
        } catch (err){
            console.error(err)
            reply.code(500).send({ message: "Ошибка при обновлении каста спектакля" });
        }
    })
    
    app.post("/delete-performance", {
        onRequest: app.csrfProtection
    }, async (request, reply) => {
        try {
            const {title} = await parseMultipartFields(request);
            await deletePerformanceFromDatabase(title)
            reply.redirect("/admin-panel")
        } catch (err) {
            console.error(err)
            reply.code(500).send({ message: "Ошибка при удалении спектакля" });
        }
    })
    
    app.post("/redact-performance", {
        onRequest: app.csrfProtection
    }, async (request, reply) => {
        const performanceData = {};
        const performanceImages = [];
        let titleImage = null;
        const writtenFiles = [];

        try {
            for await (const part of request.parts()) {
                if (part.type === 'file') {
                    if (!part.filename) {
                        part.file.resume();
                        continue;
                    }

                    const validFile = safeExtFromMime(part.filename, part.mimetype);
                    if (!validFile) {
                        part.file.resume();
                        continue;
                    }

                    const fileName = crypto.randomBytes(6).toString('base64url') + validFile;
                    const destPath = path.resolve('./assets/img/origin/', fileName);

                    await pipeline(part.file, fs.createWriteStream(destPath));
                    writtenFiles.push(destPath);
                    await generateResponsiveImages(destPath);
    
                    if (part.fieldname === 'imgs') performanceImages.push(fileName);
                    else titleImage = fileName;
                } else {
                    performanceData[part.fieldname] = part.value;
                }
            }
            await addOrUpdatePerformance(performanceData, performanceImages, titleImage);
            reply.redirect("/admin-panel");
        } catch (err) {
            for (const f of writtenFiles) {
                fs.promises.unlink(f).catch(() => {});
            }
            console.error(err)
            reply.code(500).send({ message: "Ошибка при изменении спектакля" });
        }
    })
    
    app.post("/add-playbill", {
        onRequest: app.csrfProtection
    }, async(request, reply) =>{
        try {
            const {title, date, time} = await parseMultipartFields(request);
            await addPerformanceToPlaybill(title, date, time)
            reply.redirect("/admin-panel")
        } catch (err) {
            console.error(err)
            reply.code(500).send({ message: "Ошибка при добавлении спектакля в афишу" });
        }
        
    })
    
    app.post("/delete-playbill", {
        onRequest: app.csrfProtection
    }, async(request, reply) =>{
        try {
            const {id} = await parseMultipartFields(request);
            await deletePlaybillItem(id)
            reply.redirect("/admin-panel")
        } catch (err) {
            console.error(err)
            reply.code(500).send({ message: "Ошибка при удалении спектакля из афишы" });
        }
    })
    
    app.post("/update-playbill", {
        onRequest: app.csrfProtection
    }, async (request, reply) =>{
        const { id } = request.query;
        try {
            const {title, date, time} = await parseMultipartFields(request);
            await updatePlaybillItem(Number(id), title, date, time);
            reply.redirect("/admin-panel");
        } catch (err) {
            console.error(err)
            reply.code(500).send({ message: "Ошибка при изменении спектакля из афишы" });
        }
    })
    
    app.post("/approve-review", {
        onRequest: app.csrfProtection
    }, async (request, reply) =>{
        try {
            const reviewData = await parseMultipartFields(request);
            await processReviews(reviewData)
            reply.redirect("/admin-panel")
        } catch(err) {
            console.error(err)
            reply.code(500).send({ message: "Ошибка при оборении отзыва"});
        }
    })
}

export default adminRoutes;