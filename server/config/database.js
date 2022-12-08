const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost:27017/jobs-mg';

module.exports = async function(app) {
    try{
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log('Connected to DB');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}