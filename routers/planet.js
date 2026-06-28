const express = require("express");
const router = express.Router();
const controller = require("../controllers/planetController");

router.get("/", controller.getAllPlanets);
router.get("/new", controller.newPlanetForm);
router.get("/:id", controller.getPlanetById);
router.get("/:id/edit", controller.editPlanetForm);
router.post("/", controller.createPlanet);
router.put("/:id", controller.updatePlanet);
router.delete("/:id", controller.deletePlanet);

module.exports = router;
