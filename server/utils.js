const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const generateToken = (user) => {
    return jwt.sign({
            user,
        },
        process.env.JWT_SECRET, {
            expiresIn: '30d',
        })
}

const isAuth = (req, res, next) => {

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
                    next()
                }
            }
        )
    } else {
        res.status(401).send({ message: 'No Token' });
    }

}




module.exports = { generateToken, isAuth }