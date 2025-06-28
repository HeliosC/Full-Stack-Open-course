import { useState } from 'react'
import { Filter, PersonForm, Persons } from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [nameFilter, setNameFilter] = useState('')

  const handleFilterChange = event => {
    setNameFilter(event.target.value)
  }

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const personsToDisplay = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = event => {
    setNewPhoneNumber(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newPhoneNumber}))
      setNewName('')
      setNewPhoneNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={nameFilter} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm onSubmit={handleSubmit}
        name={newName} handleNameChange={handleNameChange} 
        number={newPhoneNumber} handlePhoneNumberChange={handlePhoneNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={personsToDisplay} />
    </div>
    
  )
}

export default App