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
exports.university_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: University create POST');
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