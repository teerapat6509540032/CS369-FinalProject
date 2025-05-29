import * as mongooseDef from "mongoose";
 let mongoose = mongooseDef.default;

const orderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderID: {
        type: Number,
        required: true,
        unique: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Design',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

let Order = mongoose.model('Order', orderSchema, 'orders');

export default Order;