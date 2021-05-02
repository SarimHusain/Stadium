const user = require("../controllers/user");
const router = require("express").Router();

// Retrieve all users
router.get("/", user.findAll);

// Retrieve a single user with Name
//router.get("/:Name", user.findOne);

// Retrieve all Name users
//router.get("/all/:Name", user.findAllName);

// Create a new user
router.post("/", user.create);

// Update a user with Name
router.put("/:Name", user.update);

// Delete a user with Name
router.delete("/:Name", user.delete);

// Delete all users
router.delete("/", user.deleteAll);

module.exports = router;