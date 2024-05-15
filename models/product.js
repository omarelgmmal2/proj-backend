const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    description :{
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    img_url:{
        type : String
    },

    quantity:{
        type : Number
    }

})

module.exports = mongoose.model('Product' , productSchema)