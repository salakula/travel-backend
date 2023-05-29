module.exports = (app) => {
  const Place = require("../controllers/place.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new Place
  router.post("/places/", [authenticateRoute], Place.create);

  // Retrieve all Place
  router.get("/places/", Place.findAll);

  // Retrieve a single Place with placeId
  router.get("/places/:id", Place.findOne);

  // Update an Place with placeId
  router.put("/places/:id", [authenticateRoute], Place.update);

  // Delete an Place with placeId
  router.delete("/places/:id", [authenticateRoute], Place.delete);

  // Create a new Place
  router.delete("/places/", [authenticateRoute], Place.deleteAll);

  app.use("/travelapi", router);
};
