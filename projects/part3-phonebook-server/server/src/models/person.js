const mongoose = require('mongoose')

console.log('connecting to MongoDB')
mongoose
    .connect(process.env.MONGO_URL)
    .then(() =>
        console.log("connected to MongoDB")
    )
    .catch(error => {
        console.error('error connecting to MongoDB:', error.message)
    })


const personSchema = mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id.toString()
        delete object._id
        delete object.__v
    }
})

module.exports = mongoose.model('Person', personSchema)