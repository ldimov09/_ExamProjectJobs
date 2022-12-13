const Jobs = require("../models/jobs");
const Users = require("../models/users");
const { getById, getAll, createJob, updateJobReaction, updateUserApplications, updateById, updateUserFavorite, deleteById } = require("../services/jobService");
const jobController = require('express').Router();

jobController.get('/jobs/details/:id', async (req, res) => {

    res.send({
        result: await getById(req.params.id),
        sucsess: true
    });
})

jobController.get('/jobs', async (req, res) => {
    const result = await getAll();
    try{ 
        res.send({
            sucsess: true,
            result: result
        });
    } catch (err) {
        res.send({
            sucsess: false,
            error: err.message
        })
    }
})

jobController.post('/jobs/create', async (req, res) => {
    try {
        const result = await createJob(req.body);
        res.send({
            sucsess: true,
            result: result
        });
    } catch (err) {
        res.send({
            sucsess: false,
            error: err.message
        })
    }
})

jobController.put('/jobs/react', async (req, res) => {
    try{
        const result = await updateJobReaction(req.body);
        res.send({
            sucsess: true,
            result: result
        })
    } catch (err) {
        res.send({
            sucsess: false,
            error: err.message,
        })
    }
})

jobController.put('/jobs/apply', async (req, res) => {


    res.send(await updateUserApplications(req.body));

})

jobController.put('/jobs/favor', async (req, res) => {

    res.send(await updateUserFavorite(req.body));
})

jobController.delete('/jobs/:id', async (req,res) => {
    const id = req.params.id;
    const result = await deleteById(id);


    res.send(result);
})
jobController.put('/jobs/edit/:id', async (req, res) => {
    const id = req.params.id;

    const result = await updateById(id, req.body);

    res.send(result);
})


module.exports = jobController;