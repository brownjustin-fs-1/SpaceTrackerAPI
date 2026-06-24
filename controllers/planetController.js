const { Planet } = require("../models");

exports.getAllPlanets = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.json(planets);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }

    res.json(planet);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createPlanet = async (req, res) => {
  try {
    const planet = await Planet.create(req.body);
    res.status(201).json(planet);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }

    await planet.update(req.body);
    res.json(planet);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }

    await planet.destroy();
    res.json({ message: "Planet deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
