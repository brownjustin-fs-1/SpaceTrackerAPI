const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");

const galaxyRoutes = require("./routers/galaxy");
const starRoutes = require("./routers/star");
const planetRoutes = require("./routers/planet");
const starsPlanetsRoutes = require("./routers/starsPlanets");

const app = express();
const PORT = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/galaxies", galaxyRoutes);
app.use("/stars", starRoutes);
app.use("/planets", planetRoutes);
app.use("/stars-planets", starsPlanetsRoutes);

app.listen(PORT, () => {
  console.log(`Space Tracker API is running on port ${PORT}`);
});
