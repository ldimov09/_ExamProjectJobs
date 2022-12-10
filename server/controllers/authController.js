const { register, getAllUsers, getUserById } = require('../services/userService');
const authContoller = require('express').Router();


authContoller.post('/register', async function (req, res) {
    console.log(req.body);
    try{
        const token = await register(req.body.email, req.body.displayName, req.body.password, req.body.imageIndex, req.body.gender);
        res.send(JSON.stringify({
            result: token,
            success: true,
        }));
    } catch (err) {
        res.send(JSON.stringify({
            success: false,
            error: err.message,
        }));
        throw err; 
    } 
});

authContoller.get('/users', async (req, res) => {

    const allUsers = await getAllUsers();
    res.send({
        success: true,
        result: allUsers,
    });
})

/*
authContoller.get('/users/:id', async (req, res) => {

    const user = await getUserById(req.params.id);
    res.send({success: true, result: user});
})

*/



module.exports = authContoller;