const express = require('express')
const productSchema = require('../schemas/productSchema')
const router = express.Router()
const data = require('../data/data')
const products = require('../schemas/productSchema')
const user = require('../schemas/userSchema')
router.get('/', async(req, res) => {
    await products.remove({})
    const createdProducts = await products.insertMany(data.products)

    await user.remove({})
    const users = await user.insertMany(data.users)
    res.send([createdProducts, users]);


})

module.exports = router;