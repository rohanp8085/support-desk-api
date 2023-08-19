const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const register  = asyncHandler( async (req , res) =>{

        const {name , email, password} = req.body  
        
        console.log(req.body);

        //Validation

        if(!name || !email || !password){
           res.status(400);
            throw new Error('please include All feilds')    
        } 
       //find If user already exists
         const userExists =  await User.findOne({email : email})
        
        if(userExists){
            res.status(400)
            throw new Error("User Already Exists")
        }
      
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password , salt)

          const user = await User.create({
            name ,
            email,
            password : hashedPassword
          })
          if(user){

            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                
                token : generateToken(user._id)

            })


          }else{
            res.status(400);
            throw new Error("invalid user data")

          }
         
        }
);


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Include All Fileds!!");
  }

  // Find User
  const user = await User.findOne({ email });

  // Check user & Password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const getme =(req , res)=>{
     res.send("Me Route")
}
const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET,{
    expiresIn :"30d"
    });
};

module.exports = {register , loginUser, getme}