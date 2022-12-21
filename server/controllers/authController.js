const { register, getAllUsers, getUserById, login } = require('../services/userService');
const authContoller = require('express').Router();


authContoller.post('/register', async function (req, res) {
    try{
        console.log(req.body);
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
});

authContoller.post('/login', async (req, res) => {
    const user = {
        email: req.body.userEmail,
        password: req.body.userPassword,
    }
    try{
        const token = await login(user);
        res.send({
            success: true,
            result: token,
        })

    }catch(err) {
        res.send({
            success: false,
            error: err.message
        })
    }

})

authContoller.get('/users/:id', async (req, res) => {

    const user = await getUserById(req.params.id);
    res.send({success: true, result: user});
})




module.exports = authContoller;