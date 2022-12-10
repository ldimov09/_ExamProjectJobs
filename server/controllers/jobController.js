const Jobs = require("../models/jobs");
const Users = require("../models/users");
const { getById, getAll, createJob, updateJobReaction, updateUserApplications, updateUserFavorite, deleteById } = require("../services/jobService");
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

jobController.put('/jobs/apply', async (req, res) => {

    res.send(await updateUserApplications(req.body));

})

jobController.put('/jobs/favor', async (req, res) => {

    res.send(await updateUserFavorite(req.body));
})

jobController.delete('/jobs/:id', async (req,res) => {
    const id = req.params.id;
    const result = await deleteById(id);
})

module.exports = jobController;