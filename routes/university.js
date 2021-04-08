var express = require('express');
const university_controllers = require('../controllers/university');
var router = express.Router();

/* GET home page. */
router.get('/', university_controllers.university_view_all_Page);

module.exports = router;
