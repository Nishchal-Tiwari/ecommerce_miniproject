const mongoose = require('mongoose')


module.exports = mongoose.model("order", new mongoose.Schema({
    orderItems: [{
        slug: { type: "string", required: true },
        name: { type: "string", required: true },
        quantity: { type: "number", required: true },
        image: { type: "string", required: true },
        price: { type: "number", required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        }


    }],

    shippingAdress: {
        fullName: { type: "string", required: true },
        adress: { type: String, required: true },
        city: { type: "string", required: true },
        postalCode: { type: "string", required: true },
        country: { type: "string", required: true }
    },

    paymentMethod: { type: "string", required: true },
    paymentResults: {
        id: String,
        status: String,
        update_time: String,
        email_adress: String
    },
    itemPrice: { type: "number", required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },



}, {
    timestamps: true
}))