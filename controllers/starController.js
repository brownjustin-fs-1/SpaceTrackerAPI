const { Star } = require("../models");

exports.getAllStars = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.json(stars);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getStarById = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);

    if (!star) {
      return res.status(404).json({ message: "Star not found" });
    }

    res.json(star);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createStar = async (req, res) => {
  try {
    const star = await Star.create(req.body);
    res.status(201).json(star);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateStar = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);

    if (!star) {
      return res.status(404).json({ message: "Star not found" });
    }

    await star.update(req.body);
    res.json(star);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteStar = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);

    if (!star) {
      return res.status(404).json({ message: "Star not found" });
    }

    await star.destroy();
    res.json({ message: "Star deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
