const express = require("express")


const {register , loginUser, getme} = require('../controllers/userController');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router()

router.post("/" ,register )

router.post("/login", loginUser);

router.post("/me" ,protect, getme)
 
module.exports = router