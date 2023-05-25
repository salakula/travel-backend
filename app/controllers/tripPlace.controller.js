const db = require("../models");
const TripPlace = db.tripPlace;
const Place = db.place;
const Op = db.Sequelize.Op;
// Create and Save a new TripPlace
exports.create = (req, res) => {
  // Validate request
  console.log("here in create function");
  if (req.body.duration === undefined) {
    const error = new Error("Quantity cannot be empty for trip place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.tripId === undefined) {
    const error = new Error("Trip ID cannot be empty for trip place!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.placeId === undefined) {
    const error = new Error(
      "Place ID cannot be empty for trip place!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a TripPlace
  const tripPlace = {
    duration: req.body.duration,
    tripId: req.body.tripId,
    dayId: req.body.dayId ? req.body.dayId : null,
    placeId: req.body.placeId,
  };
  // Save TripPlace in the database
  TripPlace.create(tripPlace)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the TripPlace.",
      });
    });
};

// Retrieve all TripPlaces from the database.
exports.findAll = (req, res) => {
  const tripPlaceId = req.query.tripPlaceId;
  var condition = tripPlaceId
    ? {
        id: {
          [Op.like]: `%${tripPlaceId}%`,
        },
      }
    : null;

  TripPlace.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripPlaces.",
      });
    });
};

exports.findAllForTrip = (req, res) => {
  const tripId = req.params.tripId;
  TripPlace.findAll({
    where: { tripId: tripId },
    include: [
      {
        model: Place,
        as: "place",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripPlaces for a trip.",
      });
    });
};

// Find all TripPlaces for a trip step and include the places
exports.findAllForDayWithPlaces = (req, res) => {
  const dayId = req.params.dayId;
  TripPlace.findAll({
    where: { dayId: dayId },
    include: [
      {
        model: Place,
        as: "place",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripPlaces for a trip step.",
      });
    });
};

// Find a single TripPlace with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TripPlace.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving TripPlace with id=" + id,
      });
    });
};

// Update a TripPlace by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  TripPlace.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripPlace was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update TripPlace with id=${id}. Maybe TripPlace was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating TripPlace with id=" + id,
      });
    });
};

// Delete a TripPlace with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TripPlace.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripPlace was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete TripPlace with id=${id}. Maybe TripPlace was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete TripPlace with id=" + id,
      });
    });
};

// Delete all TripPlaces from the database.
exports.deleteAll = (req, res) => {
  TripPlace.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} TripPlaces were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all tripPlaces.",
      });
    });
};
