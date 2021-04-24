const mongoose = require("mongoose")
const universitySchema = mongoose.Schema({
name: String,
location: String,
ranking: {
    type:Number,
    min:1,
    max:100

}
})
module.exports = mongoose.model("University", universitySchema)