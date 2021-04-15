var express = require('express');
const university_controllers = require('../controllers/university');
var router = express.Router();

/* GET home page. */
router.get('/', university_controllers.university_view_all_Page);
router.get('/university/:id', university_controllers.university_detail);

/* GET detail university page */
router.get('/detail', university_controllers.university_view_one_Page);


module.exports = router;
