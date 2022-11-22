const express = require('express');
const app = express();
const data = require('./data/data.js')
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const seedRouter = require('./routes/seedRoutes');
const { response } = require('express');
const ProductRouter = require('./routes/productRoutes')
const users = require('./routes/userRoutes')
const order = require('./routes/orderRoutes')

const cors = require('cors')
const { isAuth } = require('./utils')
const jwt = require('jsonwebtoken');

dotenv.config()

 
var  corsOptions  =   {  
    origin:   'http://localhost:3000',
      optionsSuccessStatus:  200 
}

app.use(cors(corsOptions))
mongoose.connect(process.env.mongodb_url).
then(() => console.log("sucessfully connected to db")).
catch(e => console.log(e.messsage))

//    to parse  incoming form or othher data

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/seed', seedRouter)
app.use('/api/products', ProductRouter)
app.use('/users', users)
app.use('/orders', order)


app.post('/auth?', (req, res) => {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.slice(7, auth.length)
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' })
                } else {
                    require.user = decode
                    res.send(decode)
                }
            }
        )
    } else {
        res.status(401).send({ message: 'No Token' });
    }
})



// get paypal keys
app.get('/api/keys/paypal', (req, res) => {
        res.send(process.env.paypal_client_id)
    })
    // how to make a error handler for backend 



app.use((err, req, res, next) => {
    res.status(500).send({ message: "Oh ! there seems to be an error \n" + err.message })
})








app.get('/test', (req, res) => res.send({ message: "Sucessfully working API $" }))
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Started server at localhost:${port}`))