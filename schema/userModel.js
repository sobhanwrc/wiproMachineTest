const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
    name : {
        type : String,
        default : null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: 'true',
        enum: ["basic", "supervisor", "admin"]
    }
},{
    timestamps : true
});
 
const User = mongoose.model('user', UserSchema);
 
module.exports = User;