const express = require('express');

const emojis = require('./emojis');

const router = express.Router();
const superheroes = require('./superheroes')


router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/superheroes',superheroes)
module.exports = router;
