import * as mongooseDef from "mongoose";
let mongoose = mongooseDef.default;

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Design',
                required: true
            },
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

let Cart = mongoose.model('Cart', cartSchema, 'carts');

export default Cart;