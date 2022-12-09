const Jobs = require("../models/jobs");
const Users = require("../models/users");
const { getById, getAll, createJob, updateJobReaction } = require("../services/jobService");
const jobController = require('express').Router();

jobController.get('/jobs/details/:id', async (req, res) => {

    res.send(await getById(req.params.id));
})

jobController.get('/jobs', async (req, res) => {
    const result = await getAll();
    try{ 
        //console.log(result);
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
    console.log(req.body);
    try {
        const result = await createJob(req.body);
        console.log(result);
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
    console.log(req.body);
    try{
        const result = await updateJobReaction(req.body);
        console.log('Reuslt like dislike', result);
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

module.exports = jobController;