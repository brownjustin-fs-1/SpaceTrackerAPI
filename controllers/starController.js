const path = require("path");
const { Star, Galaxy } = require("../models");

const wantsJson = (req) => {
  return (
    req.query.format === "json" ||
    req.get("Accept")?.includes("application/json") ||
    req.get("Content-Type")?.includes("application/json")
  );
};

const saveImage = async (req, star) => {
  if (!req.files || !req.files.image) return;

  const imageFile = req.files.image;
  const extension = path.extname(imageFile.name);
  const fileName = `star-${star.id}${extension}`;
  const uploadPath = path.join(__dirname, "../public/images", fileName);

  await imageFile.mv(uploadPath);
  await star.update({ image: `/images/${fileName}` });
};

exports.getAllStars = async (req, res) => {
  try {
    const stars = await Star.findAll();

    if (wantsJson(req)) return res.json(stars);

    res.render("stars/index", { stars });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getStarById = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);

    if (!star) return res.status(404).json({ message: "Star not found" });

    if (wantsJson(req)) return res.json(star);

    res.render("stars/show", { star });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.newStarForm = async (req, res) => {
  const galaxies = await Galaxy.findAll();
  res.render("stars/form", { star: null, galaxies });
};

exports.editStarForm = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    const galaxies = await Galaxy.findAll();

    if (!star) return res.status(404).json({ message: "Star not found" });

    res.render("stars/form", { star, galaxies });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createStar = async (req, res) => {
  try {
    const star = await Star.create(req.body);
    await saveImage(req, star);

    if (wantsJson(req)) return res.status(201).json(star);

    res.redirect("/stars");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateStar = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);

    if (!star) return res.status(404).json({ message: "Star not found" });

    await star.update(req.body);
    await saveImage(req, star);

    if (wantsJson(req)) return res.json(star);

    res.redirect("/stars");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteStar = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);

    if (!star) return res.status(404).json({ message: "Star not found" });

    await star.destroy();

    if (wantsJson(req)) return res.json({ message: "Star deleted" });

    res.redirect("/stars");
  } catch (error) {
    res.status(500).json(error);
  }
};
