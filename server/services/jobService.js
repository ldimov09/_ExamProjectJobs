const Jobs = require('../models/jobs')

async function getById(id) {
    return Jobs.findById(id).lean();
}

async function getAll(id) {
    return Jobs.find({}).lean(); 
}

module.exports = {
    getById: getById,
    getAll: getAll,
}
