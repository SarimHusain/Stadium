const Employee = require("../models/employee");
const db = require('../Database')
const { Op } = require('sequelize')

//create and save new empoyee
exports.create = (req, res) => {
    // Validate request
    if (!req.body.EmpID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a employee
    const employee = {
      Name: req.body.Name,
      Age: req.body.Age,
      EmpID: req.body.EmpID,
      Address: req.body.Address,
      DateofJoining: req.body.DateofJoining,
      Section: req.body.Section
    };
  
    // Save employee in the database
    Employee.create(employee)
      .then(data => {
        res.redirect("/employees")
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the employee."
        });
      });
  };

// find all/search by name from employee
exports.findAll = (req, res) => {
    const Name = req.body.name;
    var condition = Name ? { Name: { [Op.like]: `${Name}` } } : null;
  
    Employee.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
    });
};  

// find by Name
exports.findName = (req, res) => {
  const Name = req.body.name;
  console.log(Name)
  var condition = Name ? { Name: { [Op.like]: `${Name}` } } : null;

  Employee.findAll({ where: condition })
    .then(Names => {
      res.send(Names);
      console.log(Names);
      // res.redirect("/api/employee/Name/:Name");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
  });
};  

// Find a single employee with an EmpID
exports.findOne = (req, res) => {
    const EmpID = req.params.EmpID
  
    Employee.findByPk(EmpID)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving employee with EmpID=" + EmpID
        });
    });
};

// Update an employee identified by the EmpID
exports.update = (req, res) => {
    const EmpID = req.params.EmpID;
  
    Employee.update(req.body, {
      where: { EmpID: EmpID }
    })
      .then(num => {
        if (num == 1) {
          res.redirect("/employees")
        } else {
          res.send({
            message: `Cannot update employee with EmpID=${EmpID}. Maybe employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating employee with EmpID=" + EmpID
        });
    });
};


// Delete an employee with EmpID
exports.delete = (req, res) => {
    const EmpID = req.params.EmpID;
  
    Employee.destroy({
      where: { EmpID: EmpID }
    })
      .then(num => {
        if (num == 1) {
          res.redirect("/employees")
        } else {
          res.send({
            message: `Cannot delete employee with EmpID=${EmpID}. Maybe employee was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete employee with EmpID=" + EmpID
        });
      });
};

// Delete all employee from the database:
exports.deleteAll = (req, res) => {
    Employee.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} employees were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all employees."
        });
    });
};

// Find all employee with EmpID is true
exports.findAllEmpID = (req, res) => {
    Employee.findAll({ where: { EmpID: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employees."
        });
    });
};