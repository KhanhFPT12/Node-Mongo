const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.post("/", carController.createCar);
router.get("/", carController.getAllCars);

module.exports = router;
