import * as mongooseDef from "mongoose";
 let mongoose = mongooseDef.default;

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [String]
});

let User = mongoose.model('User', userSchema, 'users');

export default User;