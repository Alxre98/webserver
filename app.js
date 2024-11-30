require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");

// Handlebars
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"), function (err) {
  if (err) {
    console.error("Error registering partials:", err);
  }
});

// TODO: require("hbs");
app.set("view engine", "hbs");

// Servir contenido estatico
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home", {
    nombre: "Juan",
    titulo: "Curso Node"
  });
});

app.get("/public/back/template/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/Hola-Mundo", (req, res) => {
  res.send("Hola Mundo en su respectiva ruta");
});

app.get("/:page", (req, res) => {
  const page = req.params.page;
  const validPages = ["index", "generic", "elements"]; // Lista de páginas válidas
  if (validPages.includes(page)) {
    res.sendFile(path.join(__dirname, "public", `${page}.html`));
  } else {
    res.sendFile(path.join(__dirname, "public", "404.html"));
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
