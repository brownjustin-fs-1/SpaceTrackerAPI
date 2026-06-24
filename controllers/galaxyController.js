const { Galaxy } = require("../models");

exports.getAllGalaxies = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.json(galaxies);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getGalaxyById = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (!galaxy) {
      return res.status(404).json({ message: "Galaxy not found" });
    }

    res.json(galaxy);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createGalaxy = async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    res.status(201).json(galaxy);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateGalaxy = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (!galaxy) {
      return res.status(404).json({ message: "Galaxy not found" });
    }

    await galaxy.update(req.body);
    res.json(galaxy);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteGalaxy = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (!galaxy) {
      return res.status(404).json({ message: "Galaxy not found" });
    }

    await galaxy.destroy();
    res.json({ message: "Galaxy deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
