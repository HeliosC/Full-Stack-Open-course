require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
    console.error(error)

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'Malformatted id' })
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        response.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        `)
    })
    .catch(next)
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
    .catch(next)
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    Person.findOne({ name: body.name }).then(person => {
        if(person) {
            return response.status(400).send({ error: 'name must be unique' })
        } else {
            const person = new Person({
                name: body.name,
                number: body.number
            })

            return person.save().then(savedPerson => {
                response.json(savedPerson)
            })
            .catch(next)
        }
    })
    .catch(next)

})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(next)
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                return Person.findByIdAndUpdate(
                    person.id,
                    { name: body.name, number: body.number },
                    { new : true, runValidators: true, context: 'query' }
                )
                    .then(udpatedPerson => {
                        response.json(udpatedPerson)
                    })
                    .catch(next)
            } else {
                return response.status(404).end()
            }
        })
        .catch(next)
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(next)

    response.status(204).end()
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})