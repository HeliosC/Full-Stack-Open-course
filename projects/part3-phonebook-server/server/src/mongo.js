const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const url = `mongodb+srv://Helios:${process.argv[2]}@cluster-fullstackopen.wno2mme.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster-fullstackopen`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then(() => {
        if(process.argv.length === 3) {
            return displayPeople()
        } else {
            return addPerson()
        }
    })
    .then(() => {
         return mongoose.connection.close()
     })
     .then(() => {
        process.exit(0)
     })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })


const displayPeople = async () => {
    const persons = await Person.find({})
    console.log("phonebook:")
    persons.forEach(person => {
        console.log(person.name, person.number)
    })
}

const addPerson = async () => {
    if(process.argv.length < 5) {
        console.log('Please provide the name and number as arguments: node mongo.js <password> <name> <number>')
        return
    }

    const person = new Person({ name: process.argv[3], number: process.argv[4] })
    await person.save()
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
}