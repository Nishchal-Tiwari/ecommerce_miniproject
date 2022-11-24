const express = require('express')
const router = express.Router()
const data = require('../data/data')
const Product = require('../schemas/productSchema')

router.get('/', async(req, res) => {
    const product = await Product.find();
    res.send(product)
})


router.get('/slug/:slug',
    async(req, res) => {
        const product = await Product.findOne({ slug: req.params.slug })
        if (product)
            res.send(product)
        else
            res.status(404).send({ message: "Product not found" })

    })
router.get('/:id',
    async(req, res) => {
        const product = await Product.findById(req.params.id)
        if (product)
            res.send(product)
        else
            res.status(404).send({ message: "Product not found" })

    })
router.get('/s/:cat', async(req, res) => {

    const product = await Product.find({ category: req.params.cat });
    res.send(product)
})



module.exports = router;