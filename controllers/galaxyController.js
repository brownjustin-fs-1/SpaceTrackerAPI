const path = require("path");
const { Galaxy } = require("../models");

const wantsJson = (req) => {
  return (
    req.query.format === "json" ||
    req.get("Accept")?.includes("application/json") ||
    req.get("Content-Type")?.includes("application/json")
  );
};

const saveImage = async (req, galaxy) => {
  if (!req.files || !req.files.image) return;

  const imageFile = req.files.image;
  const extension = path.extname(imageFile.name);
  const fileName = `galaxy-${galaxy.id}${extension}`;
  const uploadPath = path.join(__dirname, "../public/images", fileName);

  await imageFile.mv(uploadPath);
  await galaxy.update({ image: `/images/${fileName}` });
};

exports.getAllGalaxies = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();

    if (wantsJson(req)) {
      return res.json(galaxies);
    }

    res.render("galaxies/index", { galaxies });
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

    if (wantsJson(req)) {
      return res.json(galaxy);
    }

    res.render("galaxies/show", { galaxy });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.newGalaxyForm = (req, res) => {
  res.render("galaxies/form", { galaxy: null });
};

exports.editGalaxyForm = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (!galaxy) {
      return res.status(404).json({ message: "Galaxy not found" });
    }

    res.render("galaxies/form", { galaxy });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createGalaxy = async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    await saveImage(req, galaxy);

    if (wantsJson(req)) {
      return res.status(201).json(galaxy);
    }

    res.redirect("/galaxies");
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
    await saveImage(req, galaxy);

    if (wantsJson(req)) {
      return res.json(galaxy);
    }

    res.redirect("/galaxies");
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

    if (wantsJson(req)) {
      return res.json({ message: "Galaxy deleted" });
    }

    res.redirect("/galaxies");
  } catch (error) {
    res.status(500).json(error);
  }
};
