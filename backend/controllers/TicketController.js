const User = require("../model/userModel")
const Ticket = require("../model/ticketModel")
const AsyncHandler = require("express-async-handler")


const getTickets = AsyncHandler(async(req, res) => {
        //    get user id from jwt
         const user  =  await User.findById(req.user.id)
       if(!user){
        res.status(401)
        throw new Error("User not found")
       }
       const tickets =  await Ticket.find({user : req.user.id})
       res.status(200).json(tickets)
    })

const getTicket = AsyncHandler(async(req, res) => {
       
    const user  =  await User.findById(req.user.id)

if(!user){
    res.status(401)
    throw new Error("User not found")
   }

   const ticket =  await Ticket.findById(req.params.id)

   if(!ticket){
    res.status(404)
    throw new Error("Ticket Not Found")
   }

   if(ticket.user.toString() !== req.user.id){
      res.status(401)
      throw new Error("No Authorized")
   }

   res.status(200).json(ticket);

});

const createTicket =AsyncHandler( async (req, res) => {
    const {product , description} = req.body

    if(!product || !description) {
        res.status(401)
        throw new Error("please fill All details")
    }
    
const user  =  await User.findById(req.user.id)

if(!user){
    res.status(401)
    throw new Error("User not found")
   }
const ticket =  await Ticket.create({
    user : req.user.id,
    product,
    description,
    status : "new"
});   

res.status(201).json(ticket)
});

const updateTicket = AsyncHandler(async(req, res) => {
    const user  =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error("User not found")
       }
    
       const ticket =  await Ticket.findById(req.params.id)
    
       if(!ticket){
        res.status(404)
        throw new Error("Ticket Not Found")
       }

       const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id , req.body , {new : true})
       res.status(200).json(updatedTicket)
})
const deleteTicket = AsyncHandler(async(req, res) => {
    const user  =  await User.findById(req.user.id)

if(!user){
    res.status(401)
    throw new Error("User not found")
   }

   const ticket =  await Ticket.findById(req.params.id)

   if(!ticket){
    res.status(404)
    throw new Error("Ticket Not Found")
   }

   if(ticket.user.toString() !== req.user.id){
      res.status(401)
      throw new Error("No Authorized")
   }

   await Ticket.findOneAndDelete(req.params.id)
   res.status(200).json({success : true})
})

module.exports = { getTickets, getTicket, createTicket, updateTicket, deleteTicket }