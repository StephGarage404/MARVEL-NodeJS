const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const database = require("./database")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

/**
 * Configuration de mustache
 * comme moteur de template
 * pour l'extension .mustache
 */
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

/**
 * Configuration de express
 * pour récupérer les données d'un formulaire
 * et pour servir les fichiers statiques
 * (css, js, images, etc.)
 */

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes à ajouter ici
app.get("/personnages", (req, res) => {

  const query =
    `SELECT personnages.id, personnages.nom, personnages.description, personnages.photo, equipes.nom AS equipe_nom
    FROM personnages
    LEFT JOIN equipes ON personnages.equipe_id = equipes.id`
    ;
  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).send("Erreur lors de la récupération des personnages.");
    }
    res.render("personnages", { personnages: result, photo: result.photo });
    console.log(result);
  });
});


app.get("/profil/:id", (req, res) => {
  const id = req.params.id;
  const query = 
    `SELECT personnages.id, personnages.nom, personnages.description, personnages.photo, equipes.nom AS equipe_nom
    FROM personnages
    LEFT JOIN equipes ON personnages.equipe_id = equipes.id
    WHERE personnages.id = ?`
  ;
  database.query(query, id, (err, result) => {
    if (err) {
      return res.status(500).send("Erreur lors de la récupération du personnage.");
    }
    if (result.length === 0) {
      return res.status(404).send("Personnage non trouvé.");
    }
    res.render("profil", result[0]);
  });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});