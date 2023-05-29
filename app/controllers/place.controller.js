const db = require("../models");
const Place = db.place;
const Op = db.Sequelize.Op;

// Create and Save a new Place
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for a place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("placeDescription cannot be empty for a place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.link === undefined) {
    const error = new Error("link cannot be empty for a place!");
    error.statusCode = 400;
    throw error;
  } 

  // Create a Place
  const place = {
    name: req.body.name,
    description: req.body.description,
    link: req.body.link,
  };
  // Save Place in the database
  Place.create(place)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Place.",
      });
    });
};

// Retrieve all Places from the database.
exports.findAll = (req, res) => {
  const placeId = req.query.placeId;
  var condition = placeId
    ? {
        id: {
          [Op.like]: `%${placeId}%`,
        },
      }
    : null;

  Place.findAll({ where: condition, order: [["name", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving places.",
      });
    });
};

// Find a single Place with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Place.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Place with id=" + id,
      });
    });
};

// Update a Place by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Place.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Place was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Place with id=${id}. Maybe Place was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Place with id=" + id,
      });
    });
};

// Delete a Place with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Place.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Place was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Place with id=${id}. Maybe Place was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Place with id=" + id,
      });
    });
};

// Delete all Places from the database.
exports.deleteAll = (req, res) => {
  Place.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Places were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all places.",
      });
    });
};
