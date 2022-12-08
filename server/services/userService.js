const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const JST_SECRET = 'tm`dspoksferioh8ueyw45x89x4wbft389yce789bgrnty8c7^%$%*&&^$%^%%&*468932hy432d5j83409f45 5t9o5y845uvhyop4wm';

async function register(email, displayName, password, imageIndex, gender) {
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
       throw new Error('Email Taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        displayName,
        hashedPassword,
        imageIndex,
        gender
    });


    const token = createSession(user);

    return token;
}

async function createSession({ _id, email }) {
    const payload = {
        _id,
        email, 
    }

    const token = jwt.sign(payload, JST_SECRET);
    return token;
}

async function getAllUsers() {
    const result = User.find({}).lean();
    return result;
}

module.exports = {
    register: register,
    getAllUsers: getAllUsers,
}
