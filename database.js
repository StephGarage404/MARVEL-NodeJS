// Importer le module MySQL
const mysql = require("mysql");

// Créer une connexion à la base de données en utilisant les paramètres de connexion
const connection = mysql.createConnection({
  host: "localhost",       
  user: "root",            
  password: "",   
  database: "MarvelCrud" 
});

// Établir la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données: " + err.stack);
    return;
  }
  console.log("Connecté à la base de données en tant que ID " + connection.threadId);
});

// Exporter la connexion pour pouvoir l'utiliser dans d'autres modules
module.exports = connection;
