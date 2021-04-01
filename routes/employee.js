const employee = require("../controllers/employee");
const router = require("express").Router();

// Retrieve all employees
router.get("/", employee.findAll);

// Retrieve a single employee with EmpID
router.get("/:EmpID", employee.findOne);

// Retrieve all EmpID employees
router.get("/all/:EmpID", employee.findAllEmpID);

// Create a new employee
router.post("/", employee.create);

// Update a employee with EmpID
router.put("/:EmpID", employee.update);

// Delete a employee with EmpID
router.delete("/:EmpID", employee.delete);

// Delete all employees
router.delete("/", employee.deleteAll);

module.exports = router;