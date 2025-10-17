const mongoose = require('mongoose');

// Le Plan de construction pour une Transaction (Schéma)
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',                          
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'] 
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Transaction', transactionSchema);