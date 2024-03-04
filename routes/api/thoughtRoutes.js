const router = require('express').Router();
const {
  getThoughts,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts)

module.exports = router;