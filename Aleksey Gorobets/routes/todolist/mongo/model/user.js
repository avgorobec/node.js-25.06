const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const CTYPT_STEPS = 12;

const userSchema = new Schema({
    email: { type: String },
    password: { type: String },
    firstName: { type: String},
    lastName: {type: String},
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const password = await bcrypt.hash(this.password, CTYPT_STEPS);
        this.password = password;
    }
    next();
});

userSchema.methods.comparePassword = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');