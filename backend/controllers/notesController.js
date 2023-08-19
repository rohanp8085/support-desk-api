const asyncHandler =  require('express-async-handler')
const User = require('../model/userModel')
const Ticket =  require('../model/ticketModel')
const Note = require('../model/notesModel')


const getNotes = asyncHandler(async(req, res)=>{
    
    // get user from id in the jwt

    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error("user not found")
    }

    const ticket = await Ticket.findById(req.params.ticketId)
     
     if(!ticket){
        res.status(404)
        throw new Error("Ticket not found")
     }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")

    }

       const notes = await Note.find({ticket : req.params.ticketId})
       
       res.status(200).json(notes)
})

const addNote = asyncHandler(async(req, res)=>{
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(404)
        throw new Error("user not found")
    }

    const ticket = await Ticket.findById(req.params.ticketId)
     
     if(!ticket){
        res.status(404)
        throw new Error("Ticket not found")
     }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")

    }

    const note = await Note.create({
        text : req.body.text,
        isStaff : false,
        ticket : req.params.ticketId,
        user : req.user.id
    })

    res.status(201).json(note)
})

module.exports = {getNotes , addNote}