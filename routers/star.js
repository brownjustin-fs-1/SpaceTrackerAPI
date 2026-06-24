const express = require("express");
const router = express.Router();
const controller = require("../controllers/starController");

router.get("/", controller.getAllStars);
router.get("/:id", controller.getStarById);
router.post("/", controller.createStar);
router.put("/:id", controller.updateStar);
router.delete("/:id", controller.deleteStar);

module.exports = router;
