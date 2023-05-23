module.exports = (app) => {
    const Day = require("../controllers/day.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new Trip Step for a Trip
    router.post(
      "/trips/:tripId/days/",
      [authenticateRoute],
      Day.create
    );
  
    // Retrieve all Trip Steps
    router.get("/days/", Day.findAll);
  
    // Retrieve all Trip Steps for a Trip
    router.get("/trips/:tripId/days/", Day.findAllForTrip);
  
    // Retrieve all Trip Steps for a Trip and include the places
    router.get(
      "/trips/:tripId/daysWithPlaces/",
      Day.findAllForTripWithPlaces
    );
  
    // Retrieve a single Trip Step with id
    router.get("/trips/:tripId/days/:id", Day.findOne);
  
    // Update a Trip Step with id
    router.put(
      "/trips/:tripId/days/:id",
      [authenticateRoute],
      Day.update
    );
  
    // Delete a Trip Step with id
    router.delete(
      "/trips/:tripId/days/:id",
      [authenticateRoute],
      Day.delete
    );
  
    // Delete all Trip Steps
    router.delete("/days/", [authenticateRoute], Day.deleteAll);
  
    app.use("/travelapi", router);
  };
  