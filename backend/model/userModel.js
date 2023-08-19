const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please Add Name"] 
    },
    email :{

         type : String,
         required : [true , "Please Add Email"]
    },
    password : {
        type : String,
        required : [true , "please Add Password"]
    },
    isAdmin : {
       type : Boolean,
       required : true,
       default : false

    }

},{
    timestamps : true
})

module.exports = mongoose.model('User' , userSchema)