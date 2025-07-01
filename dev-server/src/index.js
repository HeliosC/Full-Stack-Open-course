const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
    response.send(`Hello World`)
})

 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})