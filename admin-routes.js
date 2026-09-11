import {getPlaybill, addActorToDatabase, deleteActorFromDatabase, findActors, updateActorData,
    updateCastInfo, deletePerformanceFromDatabase, addOrUpdatePerformance, addPerformanceToPlaybill,
    deletePlaybillItem, updatePlaybillItem, getUnpublishedReviews, processReviews} from './database-function.js';

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
}

export default adminRoutes;