module.exports = (app) => {
    const TripPlace = require("../controllers/tripPlace.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Trip Place for a Trip
    router.post(
      "/trips/:tripId/tripPlaces/",
      [authenticateRoute],
      TripPlace.create
    );
  
    // Retrieve all Trip Places
    router.get("/tripPlaces/", TripPlace.findAll);
  
    // Retrieve all Trip Places for a Trip
    router.get(
      "/trips/:tripId/tripPlaces/",
      TripPlace.findAllForTrip
    );
  
    // Retrieve all Trip Places for a Trip Step and include the places
    router.get(
      "/trips/:tripId/days/:dayId/tripPlacesWithPlaces/",
      TripPlace.findAllForDayWithPlaces
    );
  
    // Retrieve a single Trip Place with id
    router.get(
      "/trips/:tripId/tripPlaces/:id",
      TripPlace.findOne
    );
  
    // Update a Trip Place with id
    router.put(
      "/trips/:tripId/tripPlaces/:id",
      [authenticateRoute],
      TripPlace.update
    );
  
    // Delete a Trip Place with id
    router.delete(
      "/trips/:tripId/tripPlaces/:id",
      [authenticateRoute],
      TripPlace.delete
    );
  
    // Delete all Trip Places
    router.delete(
      "/tripPlaces/",
      [authenticateRoute],
      TripPlace.deleteAll
    );
  
    app.use("/travelapi", router);
  };
  