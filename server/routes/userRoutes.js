const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const User = require('../schemas/userSchema')
const { generateToken } = require('../utils')
router.post('/signin',
    expressAsyncHandler(async(req, res) => {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                })
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' })
    }))

router.post('/signup',
    expressAsyncHandler(async(req, res) => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        });

        const user = await newUser.save()
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        })

    })

)








module.exports = router;