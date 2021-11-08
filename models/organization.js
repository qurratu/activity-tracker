
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true, unique: true },
    created_date: { type: Date }
});
module.exports = mongoose.model('organization', UserSchema);