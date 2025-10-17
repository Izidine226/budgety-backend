const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Cet utilisateur existe déjà' });
    }

    // 2. Si l'utilisateur n'existe pas, on le crée
    user = new User({
      email,
      password,
    });

    // 3. Hacher le mot de passe avant de le sauvegarder
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Sauvegarder l'utilisateur dans la base de données
    await user.save();

    // 5. Créer et renvoyer un JSON Web Token 
    const payload = {
      user: {
        id: user.id, 
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: 3600 }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token }); 
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Vérifier si l'utilisateur existe 
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Identifiants incorrects' });
    }

    // 2. Comparer le mot de passe fourni avec celui dans la BDD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Identifiants incorrects' });
    }

    // 3. Si les identifiants sont bons, renvoyer un token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;