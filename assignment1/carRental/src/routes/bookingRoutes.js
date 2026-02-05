const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllBookings);
router.post("/", bookingController.createBooking);
router.put("/:bookingId", bookingController.updateBooking);
router.delete("/:bookingId", bookingController.deleteBooking);

// get bookings view
router.get("/view", bookingController.renderBookings);
module.exports = router;
