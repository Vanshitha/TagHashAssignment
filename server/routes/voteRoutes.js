const express = require('express');
const router = express.Router();
const db = require('../database/db');

//POST request for vote
module.exports = (db) => {router.post('/vote', async (req, res) => {
  const { name, voting_choice, casted_at } = req.body;
  try {
    const newVote = await db('votes').insert({ name, voting_choice, casted_at });
    res.json(newVote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while saving the vote' });
  }
});

//GET request for all data
router.get('/data', async (req, res) => {
  try {
    const votes = await db('votes').select('*');
    res.json({ data: votes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving the votes' });
  }
});

//GET request for vote count by choice and time
router.get('/counts', async (req, res) => {
  const { voting_choice } = req.query;
  try {
    const counts = await db('votes')
      .where({ voting_choice })
      .select(db.raw('DATE(casted_at) as casted_at, count(id) as count'))
      .groupBy('casted_at');
      
    res.json({ data: counts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving the vote counts' });
  }
});

//GET request for vote count by choice
router.get('/results', async (req, res) => {
  try {
    const results = await db('votes')
      .select(
        db.raw('SUM(CASE WHEN voting_choice = true THEN 1 ELSE 0 END) as true_count'),
        db.raw('SUM(CASE WHEN voting_choice = false THEN 1 ELSE 0 END) as false_count')
      );
    res.json({ data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving the vote results' });
  }
});


return router 
}




