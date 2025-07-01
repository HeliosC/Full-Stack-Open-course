const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const newPerson = { ...request.body }

    if(!newPerson.name || !newPerson.number) {
        return response.status(400).json({
            error: 'missing attributes'
        })
    }

    if(persons.some(person => person.name === newPerson.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    let id
    do {
        id = Math.trunc(Math.random() * 1000) 
    } while (persons.some(person => person.id === id));

    newPerson.id = id
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})