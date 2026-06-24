const { StarsPlanets } = require("../models");

exports.getAllStarsPlanets = async (req, res) => {
  try {
    const links = await StarsPlanets.findAll();
    res.json(links);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createStarsPlanets = async (req, res) => {
  try {
    const link = await StarsPlanets.create(req.body);
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteStarsPlanets = async (req, res) => {
  try {
    const link = await StarsPlanets.findByPk(req.params.id);

    if (!link) {
      return res.status(404).json({ message: "StarsPlanets link not found" });
    }

    await link.destroy();
    res.json({ message: "StarsPlanets link deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
