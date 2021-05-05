const User = require("../models/user");
const db = require('../Database')
const { Op } = require('sequelize')

//create and save new user
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body.Name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a user
    const user = {
      Name: req.body.Name,
      Event: req.body.Event,
      Email: req.body.Email,
      Address: req.body.Address,
      MoP: req.body.MoP,
    };
  
    // Save user in the database
    User.create(user)
      .then(data => {
        //res.send(data);
        res.render('booking', {completion:true})
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
  };

// find all/search by name from user
exports.findAll = (req, res) => {
    const Name = req.query.Name;
    var condition = Name ? { Name: { [Op.like]: `%${Name}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
    });
};  

// Find a single user with an EmpID
// exports.findOne = (req, res) => {
//     const EmpID = req.params.EmpID
  
//     user.findByPk(EmpID)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving user with EmpID=" + EmpID
//         });
//     });
// };

// Update an user identified by the EmpID
exports.update = (req, res) => {
    const Name = req.params.Name;
  
    User.update(req.body, {
      where: { Name: Name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with Name=${Name}. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with Name=" + Name
        });
    });
};


// Delete an user with Name
exports.delete = (req, res) => {
    const Name = req.params.Name;
  
    User.destroy({
      where: { Name: Name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with Name=${Name}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with Name=" + Name
        });
      });
};

// Delete all user from the database:
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
    });
};

// Find all user with EmpID is true
// exports.findAllEmpID = (req, res) => {
//     user.findAll({ where: { EmpID: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving users."
//         });
//     });
// };