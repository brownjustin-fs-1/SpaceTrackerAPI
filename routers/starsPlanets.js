const express = require("express");
const router = express.Router();
const controller = require("../controllers/starsPlanetsController");

router.get("/", controller.getAllStarsPlanets);
router.post("/", controller.createStarsPlanets);
router.delete("/:id", controller.deleteStarsPlanets);

module.exports = router;