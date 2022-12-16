const Jobs = require("../models/jobs");
const Users = require("../models/users");
const { getById, getAll, createJob, updateJobReaction, updateUserApplications, updateById, updateUserFavorite, deleteById } = require("../services/jobService");
const { verifyToken } = require("../services/userService");
const jobController = require('express').Router();

jobController.get('/jobs/details/:id', async (req, res) => {
    try{ 
        const token = req.headers["authorization"];

        verifyToken(token);
        const result = await getById(req.params.id);
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
        const token = req.headers["authorization"];
        verifyToken(token);
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
        const token = req.headers["authorization"];
        verifyToken(token);
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
    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        
        const result = await updateUserApplications(req.body)
        res.send({
            sucsess: true,
            result: result,
        });

    }catch(err){
        res.send({ 
            sucsess: false,
            error: err.message,
        })

    }



})

jobController.put('/jobs/favor', async (req, res) => {

    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        
        const result = await updateUserFavorite(req.body)
        res.send({
            sucsess: true,
            result: result,
        });

    }catch(err){
        res.send({ 
            sucsess: false,
            error: err.message,
        })

    }
})

jobController.delete('/jobs/:id', async (req,res) => {

    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        
        const id = req.params.id;
        const result = await deleteById(id);

        res.send({
            sucsess: true,
            result: result,
        });

    }catch(err){
        res.send({ 
            sucsess: false,
            error: err.message,
        })

    }

})
jobController.put('/jobs/edit/:id', async (req, res) => {
    try{
        const token = req.headers["authorization"];
        verifyToken(token);
        
        const id = req.params.id;
        const result = await updateById(id, req.body);

        res.send({
            sucsess: true,
            result: result,
        });

    }catch(err){
        res.send({ 
            sucsess: false,
            error: err.message,
        })

    }
})


module.exports = jobController;