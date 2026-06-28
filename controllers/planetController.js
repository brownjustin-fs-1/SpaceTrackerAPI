const path = require("path");
const { Planet } = require("../models");

const wantsJson = (req) => {
  return (
    req.query.format === "json" ||
    req.get("Accept")?.includes("application/json") ||
    req.get("Content-Type")?.includes("application/json")
  );
};

const saveImage = async (req, planet) => {
  if (!req.files || !req.files.image) return;

  const imageFile = req.files.image;
  const extension = path.extname(imageFile.name);
  const fileName = `planet-${planet.id}${extension}`;
  const uploadPath = path.join(__dirname, "../public/images", fileName);

  await imageFile.mv(uploadPath);
  await planet.update({ image: `/images/${fileName}` });
};

exports.getAllPlanets = async (req, res) => {
  try {
    const planets = await Planet.findAll();

    if (wantsJson(req)) return res.json(planets);

    res.render("planets/index", { planets });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) return res.status(404).json({ message: "Planet not found" });

    if (wantsJson(req)) return res.json(planet);

    res.render("planets/show", { planet });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.newPlanetForm = async (req, res) => {
  res.render("planets/form", { planet: null });
};

exports.editPlanetForm = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) return res.status(404).json({ message: "Planet not found" });

    res.render("planets/form", { planet });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createPlanet = async (req, res) => {
  try {
    const planet = await Planet.create(req.body);
    await saveImage(req, planet);

    if (wantsJson(req)) return res.status(201).json(planet);

    res.redirect("/planets");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) return res.status(404).json({ message: "Planet not found" });

    await planet.update(req.body);
    await saveImage(req, planet);

    if (wantsJson(req)) return res.json(planet);

    res.redirect("/planets");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) return res.status(404).json({ message: "Planet not found" });

    await planet.destroy();

    if (wantsJson(req)) return res.json({ message: "Planet deleted" });

    res.redirect("/planets");
  } catch (error) {
    res.status(500).json(error);
  }
};
