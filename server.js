// Imports 
const express = require('express');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 
const cors = require('cors')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json({ extended: false })); 

// Connexion à la base de données MongoDB -
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion à MongoDB réussie ! ');
  } catch (error) {
    console.error('Échec de la connexion à MongoDB :', error.message);
    process.exit(1);
  }
};

connectDB(); 

app.get('/', (req, res) => {
  res.send('API Budgety en ligne !');
});
app.use('/api/users', require('./routes/users'));
app.use('/api/transactions', require('./routes/transactions')); 

 
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});