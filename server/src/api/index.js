const express = require('express');
const router = express.Router();
const superheroes = require('./superheroes')


router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/superheroes',superheroes)
module.exports = router;
