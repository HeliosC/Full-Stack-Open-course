import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, PersonForm, Persons } from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons/")
      .then(response => {        
        setPersons(response.data)
      })
  }, [])

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