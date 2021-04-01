const event = require("../controllers/event");
const router = require("express").Router();

// Retrieve all events
router.get("/", event.findAll);

// Retrieve a single event with EID
router.get("/:EID", event.findOne);

// Retrieve all EID events
router.get("/all/:EID", event.findAllEID);

// Create a new event
router.post("/", event.create);

// Update a event with EID
router.put("/:EID", event.update);

// Delete a event with EID
router.delete("/:EID", event.delete);

// Delete all events
router.delete("/", event.deleteAll);

module.exports = router;