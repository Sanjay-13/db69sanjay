var University = require('../models/university');
// List of all Universities
exports.university_list = async function(req, res) {
        try{
        theUniversities = await University.find();
        res.send(theUniversities);
        }
        catch(err){
        res.error(500,`{"error": ${err}}`);
        };
};
// for a specific university.
exports.university_detail = function(req, res) {
res.send('NOT IMPLEMENTED: University detail: ' + req.params.id);
};
// Handle university create on POST.
exports.university_create_post = async function(req, res) {
    console.log(req.body)
    let document = new University();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costumetype":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.location = req.body.location;
    document.ranking = req.body.ranking;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    };
};
// Handle university delete form on DELETE.
exports.university_delete = function(req, res) {
res.send('NOT IMPLEMENTED: University delete DELETE ' + req.params.id);
};
// Handle university update form on PUT.
exports.university_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: University update PUT' + req.params.id);
};
// VIEWS
// Handle a show all view
exports.university_view_all_Page = async function(req, res) {
    try{
    theuniversities = await University.find();
    res.render('university', { title: 'university Search Results', results: theuniversities });
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    }
    };