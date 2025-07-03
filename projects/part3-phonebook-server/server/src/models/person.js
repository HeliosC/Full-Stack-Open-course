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
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: (value) => {
                return /^\d{2,3}-\d+$/.test(value)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id.toString()
        delete object._id
        delete object.__v
    }
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person