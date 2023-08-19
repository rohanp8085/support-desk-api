const express = require("express")
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")

require ('dotenv').config()


const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.get("/" , (req , res)=>{
    res.status(200)
   res.json({msg : "welcome to support desk  API"})
})


// user routes

app.use("/api/user", require("../backend/routes/userRoutes"))
 
// Ticket Routes
app.use('/api/tickets',require('./routes/TicketRoutes') )

 

app.use(errorHandler)

app.listen(PORT , ()=>{

    console.log(`server is running at PORT ${PORT} `);
})


