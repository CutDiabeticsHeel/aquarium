import {getPlaybill, addActorToDatabase, deleteActorFromDatabase, findActors, updateActorData,
    updateCastInfo, deletePerformanceFromDatabase, addOrUpdatePerformance, addPerformanceToPlaybill,
    deletePlaybillItem, updatePlaybillItem, getUnpublishedReviews, processReviews} from './database-function.js';
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs";
import { pipeline } from "stream/promises";

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


async function adminRoutes(app, opts) {
    app.addHook('onRequest', async (request, reply) => {
        if (!request.session.user) {
            return reply.redirect('/admin');
        }
    });

    app.get("/admin-panel", async (request, reply) => {
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
    
        return reply.view("search-result.ejs", {
            actors: actors
        });
    });
    
    app.get("/edit-actor/:id", async (request, reply) => {
        const {id} = request.params;
    
        return reply.view("update-actor.ejs", {
            id
        });
    });
    
    app.get("/update-playbill/:id", async (request, reply) => {
        const {id} = request.params;
        const playbillData = await getPlaybill();
        const playbillItemResult = playbillData.find(item => item.id === Number(id))
    
        return reply.view("update-playbill.ejs", {
            playbillData: playbillItemResult,
            id
        });
    })  
    
    app.post("/add-actor", async (request, reply) => {
        const actorData = {};
        const actorImages = [];
        let actorPortrait = null;
        const writtenFiles = [];

        try {
            for await (const part of request.parts()) {
                if (part.type === 'file') {
                    if (!part.filename) continue;
                    const validFile = safeExtFromMime(part.filename, part.mimetype);
                    if (!validFile) {
                        part.file.resume();
                        continue;
                    }
    
                    const fileName = crypto.randomUUID() + validFile;
                    const destPath = path.resolve('./assets/img/', fileName);

                    await pipeline(part.file, fs.createWriteStream(destPath));
                    writtenFiles.push(destPath);
    
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
            reply.code(500).send({ error: err.message });
        }
    })
    
    app.post("/delete-actor", async(request, reply) =>{
        try {
            const {firstName, lastName, patronymic} = request.body;
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
        const writtenFiles = [];

        try {
            for await (const part of request.parts()) {
                if (part.type === 'file') {
                    if (!part.filename) continue;
                    const validFile = safeExtFromMime(part.filename, part.mimetype);
                    if (!validFile) {
                        part.file.resume();
                        continue;
                    }
    
                    const fileName = crypto.randomUUID() + validFile;
                    const destPath = path.resolve('./assets/img/', fileName);

                    await pipeline(part.file, fs.createWriteStream(destPath));
                    writtenFiles.push(destPath);
    
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
        } catch (err) {
            reply.code(500).send({ error: err.message });
        }
    })
    
    app.post("/redact-performance", async (request, reply) => {
        const performanceData = {};
        const performanceImages = [];
        let titleImage = null;
        const writtenFiles = [];

        try {
            for await (const part of request.parts()) {
                if (part.type === 'file') {
                    if (!part.filename) continue;

                    const validFile = safeExtFromMime(part.filename, part.mimetype);
                    if (!validFile) {
                        part.file.resume();
                        continue;
                    }

                    const fileName = crypto.randomUUID() + validFile;
                    const destPath = path.resolve('./assets/img/', fileName);

                    await pipeline(part.file, fs.createWriteStream(destPath));
                    writtenFiles.push(destPath);
    
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
            reply.code(500).send({ error: err.message });
        }
    })
    
    app.post("/add-playbill", async(request, reply) =>{
        try {
            const {title, date, time} = request.body
            await addPerformanceToPlaybill(title, date, time)
            reply.redirect("/admin-panel")
        } catch (err) {
            reply.code(500).send({ error: err.message });
        }
        
    })
    
    app.post("/delete-playbill", async(request, reply) =>{
        try {
            const {id} = request.body
            await deletePlaybillItem(id)
            reply.redirect("/admin-panel")
        } catch (err) {
            reply.code(500).send({ error: err.message });
        }
    })
    
    app.post("/update-playbill", async (request, reply) =>{
        const { id } = request.query;
        const {title, date, time} = request.body;
        try {
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
}

export default adminRoutes;