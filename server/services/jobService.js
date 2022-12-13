const Jobs = require('../models/jobs');
const Users = require('../models/users');

async function getById(id) {
    return Jobs.findById(id).lean();
}

async function getAll(id) {
    return Jobs.find({}).lean(); 
}

async function createJob(job) {
    return await Jobs.create(job);
}

async function updateJobReaction({jobId, reaction, userId}) {
    const job = await Jobs.findById(jobId)
    const indexLike = job.likes.indexOf(userId);
    const indexDislike = job.dislikes.indexOf(userId);

    if(indexLike != -1) job.likes.splice(indexLike, 1);
    if(indexDislike != -1) job.dislikes.splice(indexDislike, 1);

    if(reaction == 'like'){
        job.likes.push(userId);
    }
    if(reaction == 'dislike') {
        job.dislikes.push(userId);
    }

    return await job.save();
}

async function updateUserApplications({userId, action, jobId}) {
    const user = await Users.findById(userId);
    const job = await Jobs.findById(jobId);
    const indexApplication = user.applications.indexOf(jobId);
    const indexApplicationInJob = job.applications.indexOf(userId);

    if(indexApplicationInJob != -1) {
        job.applications.splice(indexApplicationInJob, 1);
    }
    
    if(indexApplication != -1) {
        user.applications.splice(indexApplication, 1);
    }

    if(action == true) {
        job.applications.push(userId);
    }

    if(action == true) {
        user.applications.push(jobId);
    }

    await job.save();
    return await user.save();
}

async function updateUserFavorite({userId, action, jobId}) {
    const user = await Users.findById(userId);
    const indexFavorite = user.favorites.indexOf(jobId);
    
    if(indexFavorite != -1) {
        user.favorites.splice(indexFavorite, 1);
    }

    if(action == true) {
        user.favorites.push(jobId);
    }
    
    return await user.save();
}


async function deleteById(id) {
    //id='639377c1045fca10ea31bc82';
    //let users = await Users.find({'applications': id});
    //users = await Users.find({'favorites': id});

    let users = await Users.find({});
    for(let user of users){
        let save = false;
        let index = user.applications.indexOf(id);
        if(index !== -1) {
            user.applications.splice(index, 1);
            save = true;
        }
        index = user.favorites.indexOf(id);
        if(index !== -1) {
            user.favorites.splice(index, 1);
            save = true;
        }
        if(save) await user.save();
    }

    //return null;
    return await Jobs.findByIdAndRemove(id);
}

async function updateById(id, job) {
    const existing = await Jobs.findById(id);
    existing.name = job.name;
    existing.description = job.description;
    existing.salary = job.salary;

    return await existing.save();
}

module.exports = {
    getById: getById,
    getAll: getAll,
    createJob: createJob,
    updateJobReaction: updateJobReaction,
    updateUserApplications: updateUserApplications,
    updateUserFavorite: updateUserFavorite,
    deleteById: deleteById,
    updateById: updateById,
}
