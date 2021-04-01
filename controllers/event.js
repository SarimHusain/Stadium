const Event = require("../models/event");
const db = require('../Database')
const { Op } = require('sequelize')

//create and save new event
exports.create = (req, res) => {
    // Validate request
    if (!req.body.EID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a event
    const event = {
      Name: req.body.Name,
      Date: req.body.Date,
      EID: req.body.EID,
      People: req.body.People,
      Cost: req.body.Cost,
    };
  
    // Save event in the database
    Event.create(event)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the event."
        });
      });
  };

// find all/search by name from event
exports.findAll = (req, res) => {
    const Name = req.query.Name;
    var condition = Name ? { Name: { [Op.like]: `%${Name}%` } } : null;
  
    Event.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving events."
        });
    });
};  

// Find a single event with an EID
exports.findOne = (req, res) => {
    const EID = req.params.EID
  
    Event.findByPk(EID)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving event with EID=" + EID
        });
    });
};

// Update an event identified by the EID
exports.update = (req, res) => {
    const EID = req.params.EID;
  
    Event.update(req.body, {
      where: { EID: EID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "event was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update event with EID=${EID}. Maybe event was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating event with EID=" + EID
        });
    });
};


// Delete an event with EID
exports.delete = (req, res) => {
    const EID = req.params.EID;
  
    Event.destroy({
      where: { EID: EID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "event was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete event with EID=${EID}. Maybe event was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete event with EID=" + EID
        });
      });
};

// Delete all event from the database:
exports.deleteAll = (req, res) => {
    Event.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} events were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all events."
        });
    });
};

// Find all event with EID is true
exports.findAllEID = (req, res) => {
    Event.findAll({ where: { EID: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving events."
        });
    });
};