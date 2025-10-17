const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Récupérer le token du header de la requête
  const token = req.header('x-auth-token');

  // 2. Vérifier si un token est présent
  if (!token) {
    return res.status(401).json({ msg: 'Aucun token, autorisation refusée' });
  }

  // 3. Vérifier la validité du token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; 
    next(); 
  } catch (err) {
    res.status(401).json({ msg: 'Token non valide' });
  }
};