var express = require('express');
const university_controllers = require('../controllers/university');
var router = express.Router();

// A little function to check if we have an authorized user and continue on
// or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
    }
/* GET home page. */
router.get('/', university_controllers.university_view_all_Page);
router.get('/university/:id', university_controllers.university_detail);

/* GET detail university page */
router.get('/detail', university_controllers.university_view_one_Page);

/* GET create university page */
router.get('/create', secured, university_controllers.university_create_Page);

/* GET create update page */
router.get('/update', secured, university_controllers.university_update_Page);

/* GET create costume page */
router.get('/delete', secured, university_controllers.university_delete_Page);


module.exports = router;
