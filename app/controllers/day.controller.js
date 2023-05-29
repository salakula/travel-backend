const db = require("../models");
const Day = db.day;
const TripPlace = db.tripPlace;
const Place = db.place;
const Op = db.Sequelize.Op;
// Create and Save a new Day
exports.create = (req, res) => {
  // Validate request
  if (req.body.date === undefined) {
    const error = new Error("date cannot be empty for day creation!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.weekday === undefined) {
    const error = new Error("weekday be empty for day creation!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("description cannot be empty for day creation!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.hotelName === undefined) {
    const error = new Error("hotel_name cannot be empty for  day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.hotelAddress === undefined) {
    const error = new Error("hotel_address cannot be empty for day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.hotelPhone === undefined) {
    const error = new Error("hotel_phone cannot be empty for day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.hotelLink === undefined) {
    const error = new Error("hotel_link cannot be empty day!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.tripId === undefined) {
    const error = new Error("Trip ID cannot be empty for day!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Day
  const day = {
    date: req.body.date,
    weekday: req.body.weekday,
    description: req.body.description,
    hotelName: req.body.hotelName,
    hotelAddress: req.body.hotelAddress,
    hotelPhone: req.body.hotelPhone,
    hotelLink: req.body.hotelLink,
    tripId: req.body.tripId,
  };
  // Save Day in the database
  Day.create(day)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Day.",
      });
    });
};
// Retrieve all Days from the database.
exports.findAll = (req, res) => {
  const dayId = req.query.dayId;
  var condition = dayId
    ? {
        id: {
          [Op.like]: `%${dayId}%`,
        },
      }
    : null;

  Day.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving days.",
      });
    });
};

// Retrieve all Days for a trip from the database.
exports.findAllForTrip = (req, res) => {
  const tripId = req.params.tripId;

  Day.findAll({
    where: { tripId: tripId },
    order: [["date", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving days for a trip.",
      });
    });
};

// Find all Days for a trip and include the places
exports.findAllForTripWithPlaces = (req, res) => {
  const tripId = req.params.tripId;
  Day.findAll({
    where: { tripId: tripId },
    include: [
      {
        model: TripPlace,
        as: "tripPlace",
        required: false,
        include: [
          {
            model: Place,
            as: "place",
            required: false,
          },
        ],
      },
    ],
    order: [["date", "ASC"]],
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

// Find a single Day with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Day.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Day with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Day with id=" + id,
      });
    });
};
// Update a Day by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Day.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Day was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Day with id=${id}. Maybe Day was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Day with id=" + id,
      });
    });
};
// Delete a Day with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Day.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Day was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Day with id=${id}. Maybe Day was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Day with id=" + id,
      });
    });
};
// Delete all Days from the database.
exports.deleteAll = (req, res) => {
  Day.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Days were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all days.",
      });
    });
};
