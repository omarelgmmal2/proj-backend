const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const appError = require('../util/AppErorr.js');
const user = require('../models/user.js');

const secretKey = "home_fish"

const register = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    const oldUser = await user.findOne({ email: email});

    if(oldUser) {
        const error = appError.create('user already exists', 400, "fail")
        return next(error);
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 12);


    const newUser = new user({
        firstname,
        lastname,
        email,
        password: hashedPassword,
    })

    // generate JWT token 
    const token = jwt.sign({email: newUser.email, id: newUser._id},secretKey,{expiresIn : '7d'});
    newUser.token = token;

    await newUser.save();

    res.status(201).json({status: "Success", data: {user: newUser}})

}


const login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = appError.create('email and password are required', 400, "fail")
        return next(error);
    }

    const User = await user.findOne({email: email});

    if(!User) {
        const error = appError.create('user not found', 400, "fail")
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, User.password);

    if(User && matchedPassword) {
        // logged in successfully

       const token = jwt.sign({email: user.email, id: user._id},secretKey,{expiresIn:'7d'});

        return res.json({ status: "SUCCESS", data: {token}});
    } 
    else {
        const error = appError.create('something wrong', 500, "Error")
        return next(error);
    }

}

const logout = async (req, res, next) => {}

const deleteAccount = async (req, res, next) => {}

module.exports = {
    register,
    login,
    logout,
    deleteAccount
}