const Jobs = require("../models/jobs");
const Users = require("../models/users");
const { getById, getAll } = require("../services/jobService");
const jobController = require('express').Router();

jobController.get('/jobs/details/:id', async (req, res) => {
     
    res.send(await getById(req.params.id));
}) 

jobController.get('/jobs', async (req, res) => {
    const result = await getAll();
    console.log(result);
    res.send(result);
})


module.exports = jobController;