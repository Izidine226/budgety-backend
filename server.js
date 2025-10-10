// 1. Importer la librairie Express
const express = require('express');

// 2. Créer l'application Express
const app = express();

// 3. Définir le port d'écoute. On utilise une variable d'environnement si elle existe, sinon le port 5000
const PORT = process.env.PORT || 5000;

// 4. Créer une route "test" pour vérifier que le serveur fonctionne
// Quand quelqu'un visite "http://localhost:5000/", cette fonction s'exécute.
app.get('/', (req, res) => {
  res.send('<h1>Bravo, votre serveur Budgety est en ligne !</h1>');
});

// 5. Démarrer le serveur et écouter les requêtes sur le port défini
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});