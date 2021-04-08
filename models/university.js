const mongoose = require("mongoose")
const universitySchema = mongoose.Schema({
name: String,
location: String,
ranking: Number
})
module.exports = mongoose.model("University", universitySchema)