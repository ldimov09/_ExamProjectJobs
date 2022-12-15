const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const JST_SECRET = 'tm`dspoksferioh8ueyw45x89x4wbft389yce789bgrnty8c7^%$%*&&^$%^%%&*468932hy432d5j83409f455t9o5y845uvhyop4wm';

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

async function createSession({ _id, email, displayName }) {
    const payload = {
        _id,
        email, 
        displayName
    }

    const token = jwt.sign(payload, JST_SECRET);
    return token;
}

async function getAllUsers() {
    const result = User.find({}).lean();
    return result;
}

async function getUserById(id) {
    return User.findById(id).lean();
}

async function login({email, password}) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect email or password!');
    }
    
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    
    if (!hasMatch) {
        throw new Error('Incorrect email or password!');
    }
    return await createSession(user);
}

function verifyToken(token) {
    return jwt.verify(token, JST_SECRET);
}


module.exports = {
    register: register,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    login: login,
    verifyToken:verifyToken
}
