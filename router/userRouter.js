const express = require('express');
const router = express.Router();
const userauth = require('../controllers/auth')

router.post('/register',userauth.register)
router.post('/login' , userauth.login)
router.post('/logout' , userauth.logout)
router.delete('/deleteAccount' , userauth.deleteAccount)


module.exports = router;