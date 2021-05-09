const employee = require("../controllers/employee");
const router = require("express").Router();

// Retrieve all employees
router.get("/", employee.findAll);


// /search
// req.params => /search?name="aas"
// req.params => /search?id="aas"
// req.params => /search?name="assd"&id="aas"

// let { name, id, asdsd... } = req.params
// query = "sad f"
// if (name) => szhds
// if (id) => sdfsdf

// Retrieve all employees
router.get("/Name/:Name", employee.findName);

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