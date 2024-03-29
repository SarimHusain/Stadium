const Seats = require("../models/seats");
const db = require('../Database')
const { Op } = require('sequelize')

//create and save new seats
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Position) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a seats
    const seats = {
      Position: req.body.Position,
      Filled: req.body.Filled,
      E_ID: req.body.E_ID
    };
  
    // Save seats in the database
    Seats.create(seats)
      .then(data => {
        res.redirect("/seats")
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the seats."
        });
      });
  };

// find all/search by name from seats
exports.findAll = (req, res) => {
    const Position = req.query.Position;
    var condition = Position ? { Position: { [Op.like]: `%${Position}%` } } : null;
  
    Seats.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving seats."
        });
    });
};  

// Find a single seats with an Position
exports.findOne = (req, res) => {
    const Position = req.params.Position
  
    Seats.findByPk(Position)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving seats with Position=" + Position
        });
    });
};

// Update an seats identified by the Position
exports.update = (req, res) => {
    const id = req.params.id;
  
    Seats.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.redirect("/seats")
        } else {
          res.send({
            message: `Cannot update seats with id=${id}. Maybe seats was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating seats with id=" + id
        });
    });
};


// Delete an seats with Position
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Seats.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.redirect("/seats")
        } else {
          res.send({
            message: `Cannot delete seats with id=${id}. Maybe seats was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete seats with id=" + id
        });
      });
};

// Delete all seats from the database:
exports.deleteAll = (req, res) => {
    Seats.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} seatss were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all seatss."
        });
    });
};

// Find all seats with Position is true
exports.findAllPosition = (req, res) => {
    Seats.findAll({ where: { Position: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving seatss."
        });
    });
};