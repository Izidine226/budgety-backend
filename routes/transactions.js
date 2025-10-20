const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const Transaction = require('../models/Transaction'); 


router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

router.post('/', auth, async (req, res) => {
  const { description, amount, type, category } = req.body;

  try {
    const newTransaction = new Transaction({
      user: req.user.id,
      description,
      amount,
      type,
      category,
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction non trouvée' });
    }


    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Autorisation non valide' });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Transaction supprimée' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;