const db = require("../models");
const Trip = db.trip;
const Day = db.day;
const TripPlace = db.tripPlace;
const Place = db.place;
const User = db.user;
const Op = db.Sequelize.Op;
// Create and Save a new Trip
exports.create = async (req, res) => {

  console.log(req.body.name);
  console.log(req.body.description);
  console.log(req.body.startDate);
  console.log(req.body.endDate);
  console.log(req.body.userId);
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Start date cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.startDate === undefined) {
    const error = new Error("End date cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.endDate === undefined) {
    const error = new Error("User Id cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }else if (req.body.userId === undefined) {
    const error = new Error("User Id cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Trip
  const trip = {
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  // Save Trip in the database
  Trip.create(trip)
    .then((data) => {
      User.findByPk(req.body.userId)
        .then((user) => {
          data.addUser(user);
        })
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Trip.",
      });
    });
};

// Find all Trips for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Trip.findAll({
    include: [
      {
        model: User,
        where: { id: userId }
      },
      {
        model: Day,
        as: "day",
        required: false,
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
      },
    ],
    order: [
      ["name", "ASC"],
      [Day, "date", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Trips for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Trips for user with id=" + userId,
      });
    });
};

// Find all Published Trips
exports.findAllPublished = (req, res) => {
  Trip.findAll({

    include: [
      {
        model: User,
      },
      {
        model: Day,
        as: "day",
        required: false,
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
      },
    ],
    order: [
      ["name", "ASC"],
      [Day, "date", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published Trips.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Trips.",
      });
    });
};

// Find a single Trip with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Trip.findAll({
    where: { id: id },
    include: [
      {
        model: Day,
        as: "day",
        required: false,
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
      },
    ],
    order: [[Day, "date", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Trip with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Trip with id=" + id,
      });
    });
};
// Update a Trip by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Trip.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Trip was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Trip with id=${id}. Maybe Trip was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Trip with id=" + id,
      });
    });
};
// Delete a Trip with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Trip.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Trip was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Trip with id=" + id,
      });
    });
};
// Delete all Trips from the database.
exports.deleteAll = (req, res) => {
  Trip.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Trips were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all trips.",
      });
    });
};


// Add user to trip
exports.addUser = async (req, res) => {
  const trip =await Trip.findByPk(req.params.id)
  const user =await User.findByPk(req.params.userId)
  if (trip && user) {
    trip.addUser(user)
    res.send({
      message: "User was added to trip successfully.",
    });
  }

};
