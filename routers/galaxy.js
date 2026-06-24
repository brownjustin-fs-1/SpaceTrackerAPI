const express = require("express");
const router = express.Router();
const controller = require("../controllers/galaxyController");

router.get("/", controller.getAllGalaxies);
router.get("/:id", controller.getGalaxyById);
router.post("/", controller.createGalaxy);
router.put("/:id", controller.updateGalaxy);
router.delete("/:id", controller.deleteGalaxy);

module.exports = router;
