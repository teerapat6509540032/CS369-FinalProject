import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const counterSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    seq: {
        type: Number,
        default: 0
    }
})

let Counter = mongoose.model('Counter', counterSchema, 'counters');

export default Counter;