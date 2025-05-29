import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const designSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: String,
        required: true,
        unique: true
    },name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    designData: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['shirt', 'mug', 'phonecase', 'bag'], 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

let Design = mongoose.model('Design', designSchema, 'designs');

export default Design;