const Jobs = require('../models/jobs')

async function getById(id) {
    return Jobs.findById(id).lean();
}

async function getAll(id) {
    return Jobs.find({}).lean(); 
}

async function createJob(job) {
    return await Jobs.create(job);
}

async function updateJobReaction({jobId, reaction, ownerId}) {
    const job = await Jobs.findById(jobId)
    console.log(job.likes);
    const indexLike = job.likes.indexOf(ownerId);
    const indexDislike = job.dislikes.indexOf(ownerId);

    if(indexLike != -1) job.likes.splice(indexLike, 1);
    if(indexDislike != -1) job.dislikes.splice(indexDislike, 1);

    if(reaction == 'like'){
        job.likes.push(ownerId);
    }
    if(reaction == 'dislike') {
        job.dislikes.push(ownerId);
    }

    return await job.save();
}

module.exports = {
    getById: getById,
    getAll: getAll,
    createJob: createJob,
    updateJobReaction: updateJobReaction,
}
