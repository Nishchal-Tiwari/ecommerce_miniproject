const { request } = require('express');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router()
const Order = require('../schemas/orderSchema')
const { isAuth, generateToken } = require('../utils')
const user = require('../schemas/userSchema')
router.post('/', isAuth,
        expressAsyncHandler(async(req, res) => {
            const neworder = new Order({
                orderItems: Request.body.orderItems.map(x => ({...x, pdoduct: x_id })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            })

            const order = await neworder.save()
            res.status.send(201).send({ message: 'New Order Created \n', order })
        })
    ),

    router.get('/:id', isAuth, expressAsyncHandler(
        async(req, res) => {
            const order = await Order.findById(req.params.id);
            if (order) {
                res.send(order)
            } else {
                res.status(404).send({ message: 'Order Not Found' })
            }
        }
    ))

router.put(':/id/pay', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now()
        order.paymentResults = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_adress: req.body.email_adress
        }
        const updatedorder = await order.save();
        res.send({ message: 'Order Paid', order: updatedorder })
    } else {
        res.status(404).send({ message: 'Order Not Found' })
    }
}))


router.get('/mine', isAuth, expressAsyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id })
}))

router.get('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await user.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save()
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        })
    } else {
        res.status(404).send({ message: 'User Not Found' })
    }
}))

module.exports = router;