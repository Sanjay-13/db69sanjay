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
//exports.university_detail = function(req, res) {
//res.send('NOT IMPLEMENTED: University detail: ' + req.params.id);
//};
// Handle university create on POST.
exports.university_create_post = async function(req, res) {
    console.log(req.body)
    let document = new University();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    
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
exports.university_delete = async function(req, res) {
    console.log("delete "  + req.params.id)
    try {
        result = await University.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }

};
// Handle university update form on PUT.
//exports.university_update_put = function(req, res) {
//res.send('NOT IMPLEMENTED: University update PUT' + req.params.id);
//};
exports.university_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await University.findById( req.params.id)
        // Do updates of properties
        if(req.body.name) toUpdate.name = req.body.name;
        if(req.body.location) toUpdate.location = req.body.location;
        if(req.body.ranking) toUpdate.ranking = req.body.ranking;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
}

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

    exports.university_detail = async function(req, res) {
        console.log("detail"  + req.params.id)
        try {
            result = await University.findById( req.params.id)
            res.send(result)
        } catch (error) {
            res.status(500)
            res.send(`{"error": document for id ${req.params.id} not found`);
        }
    };

    // Handle a show one view with id specified by query
exports.university_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await University.findById( req.query.id)
        res.render('universitydetail', 
{ title: 'university Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
