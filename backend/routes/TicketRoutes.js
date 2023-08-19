const express =  require("express")

const router = express.Router();

const {protect} =  require("../middleware/authMiddleware");
const { getTickets, createTicket, getTicket, updateTicket, deleteTicket } = require("../controllers/TicketController");


router.route('/').get(protect , getTickets).post(protect , createTicket)

router
.route('/:id')

.get(protect, getTicket)
.put(protect , updateTicket)
.delete(protect , deleteTicket)

// Re Route Into Notes Routes
  router.use('/:ticketId/notes' , require("../routes/notesRoutes"))


module.exports = router