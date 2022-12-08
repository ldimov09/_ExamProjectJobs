const { Types, Schema, model } = require("mongoose");

const userSchema = new Schema({
    displayName: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    favorites: [{ type: Types.ObjectId, ref: 'Jobs' }],
    applications: [{ type: Types.ObjectId, ref: 'Jobs' }],
    gender: { type: String, required: true},
    imageIndex: { type: Number, required: true},
});

userSchema.index({ email: 1 }, {
    options: {
        collation: {
            locale: 'en',
            strength: 2,
        }
    }
});
const Users = model('Users', userSchema);
module.exports = Users;
