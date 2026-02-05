const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');

//get bookings 
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

//post booking

exports.createBooking = async (req, res) => {
    try {
        const { customerName, carNumber, startDate, endDate } = req.body;

        // bo sung them kiem tra ngay hop le
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                message: "Invalid booking dates"
            });
        }

        // check car availability
        const car = await Car.findOne({ carNumber: carNumber });

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // check date conflicts
        const conflictingBooking = await Booking.findOne({
            carNumber,
            startDate: { $lt: new Date(endDate) },
            endDate: { $gt: new Date(startDate) }
        });

        if (conflictingBooking) {
            return res.status(400).json({ message: "Car is already booked for the selected dates" });
        }

        // tinh so ngay thue
        const days =
            (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

        if (days <= 0) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        // tinh tong tien
        const totalPrice = days * car.pricePerDay;

        // tao booking moi
        const newBooking = new Booking({
            customerName,
            carNumber,
            startDate,
            endDate,
            totalPrice
        });
        // cap nhat trang thai xe
        car.status = "rented";
        await car.save();

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// put booking
exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.bookingId,
            req.body,
            { new: true }
        );
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

//delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        await Booking.findByIdAndDelete(req.params.bookingId);

        await Car.updateOne(
            { carNumber: booking.carNumber },
            { status: "available" }
        );
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.renderBookings = async (req , res) => {
    const bookings = await Booking.find();
    res.render("bookings", { bookings });
} 