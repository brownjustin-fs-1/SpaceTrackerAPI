const express = require("express");

const galaxyRoutes = require("./routers/galaxy");
const starRoutes = require("./routers/star");
const planetRoutes = require("./routers/planet");
const starsPlanetsRoutes = require("./routers/starsPlanets");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Space Tracker API is running" });
});

app.use("/galaxies", galaxyRoutes);
app.use("/stars", starRoutes);
app.use("/planets", planetRoutes);
app.use("/stars-planets", starsPlanetsRoutes);

app.listen(PORT, () => {
  console.log(`Space Tracker API is running on port ${PORT}`);
});
