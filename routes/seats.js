const seats = require("../controllers/seats");
const router = require("express").Router();

// Retrieve all seatss
router.get("/", seats.findAll);

// Retrieve a single seats with position
router.get("/position", seats.findOne);

// Retrieve all position seatss
router.get("/all/position", seats.findAllPosition);

// Create a new seats
router.post("/", seats.create);

// Update a seats with position
router.put("/position", seats.update);

// Delete a seats with position
router.delete("/position", seats.delete);

// Delete all seatss
router.delete("/", seats.deleteAll);

module.exports = router;