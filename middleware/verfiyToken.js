const jwt = require('jsonwebtoken');
const appError = require('../util/AppErorr').default;
const secretKey = "home_fish"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader) {
        const error = appError.create('token is required', 401, "ERROR")
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    try {

        const currentUser = jwt.verify(token, secretKey);
        req.currentUser = currentUser;
        next();

    } catch (err) {
        const error = appError.create('invalid token', 401, "ERROR")
        return next(error);
    }   
    
}

module.exports = verifyToken;