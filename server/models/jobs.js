const { Types, Schema, model } = require("mongoose");

const jobSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'Users', required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    salary: {type: Number, required: true},
    likes: [{ type: Types.ObjectId, ref: 'Users' }],
    dislikes: [{ type: Types.ObjectId, ref: 'Users' }],
    applications: [{ type: Types.ObjectId, ref: 'Users' }],
});



module.exports = model('Jobs', jobSchema);