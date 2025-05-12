const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    tasks: {
        telegram: { type: Boolean, default: false },
        x: { type: Boolean, default: false },
        pepe: { type: Boolean, default: false },
        wallet: { type: Boolean, default: false }
    },
    referrals: { type: Number, default: 0 },
    stakedPoints: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);