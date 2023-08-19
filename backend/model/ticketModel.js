const  mongoos = require("mongoose")

const ticketSchema =  new mongoos.Schema({
     user : {
        type : mongoos.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
     }, product : {
        type : String,
          required : String,
          enum : ['iphone' ,  'macbook' , 'ipad' , 'imac']
     },
       description : {
        type : String,
        required : [true , 'please enter a description of your issue']
    }, status : {
        type : String,
        required : true,
        enum : ['new' , 'open', 'close'],
        default : 'new'
        

    }
},{
     timestamps : true
})

module.exports =  mongoos.model("Ticket" , ticketSchema)