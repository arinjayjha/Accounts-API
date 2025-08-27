const express = require('express');
const store = require('../data/accounts');

const router = express.Router();

// GET /api/accounts -> returns all accounts
router.get('/api/accounts', (req, res) => {
  res.status(200).json(store.list());
});

// POST /api/accounts -> adds a new account
router.post('/api/accounts', (req, res) => {
  const { id, holder, balance } = req.body || {};
  if (balance !== undefined && balance < 0) {
    return res.status(400).json({ error: "Balance cannot be negative" });
  }
  const acc = { id, holder, balance };
  store.add(acc);
  res.status(201).json(acc);
});

// PUT /api/accounts/:id -> updates an account
router.put('/api/accounts/:id', (req, res) => {
  const { balance } = req.body || {};
  if (balance !== undefined && balance < 0) {
    return res.status(400).json({ error: "Balance cannot be negative" });
  }
  const updated = store.update(req.params.id, req.body || {});
  if (!updated) {
    return res.status(404).json({ error: "Account not found" });
  }
  res.status(200).json(updated);
});

// DELETE /api/accounts/:id -> deletes an account
router.delete('/api/accounts/:id', (req, res) => {
  const removed = store.remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: "Account not found" });
  }
  // Return the full list after deletion (as per assignment)
  res.status(200).json(store.list());
});

module.exports = router;
