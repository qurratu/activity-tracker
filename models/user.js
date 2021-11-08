
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    phone: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    created_date: { type: Date },
    role: { type: String , enum : ['member','admin'],default: 'member' },
    org_id: { type: Number },
    status: { type: Number , enum : [0,1,2], default: 1 } 
});
module.exports = mongoose.model('user', UserSchema);