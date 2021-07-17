const mongoose = require("mongoose")

const functionSchema = mongoose.Schema({
    name: {
        type:String //TODO: validation 
    },
    content: {
        type:String
    },
    description: {
        type:String
    },
    lang: {
        type:String
    },
})

const functionModel = mongoose.model("function", functionSchema)
module.exports = functionModel
