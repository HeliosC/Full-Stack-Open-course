import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons } from './components/PhoneBook'
import personService from './services/persons'
import { Success, Error } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {        
        setPersons(persons)
      })
  }, [])

  const [nameFilter, setNameFilter] = useState('')
  const [successMessage, setsuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

    const person = persons.find(person => person.name === newName)
    if (person) {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update({ ...person, number: newPhoneNumber })
          .then((updatedPerson) => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setsuccessMessage(`Updated ${newName}`)
            setTimeout(() => { setsuccessMessage(null) }, 5000);  
          })
      }
    } else {
      personService
        .create({ name: newName, number: newPhoneNumber })
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewPhoneNumber('')
          setsuccessMessage(`Added ${newName}`)
          setTimeout(() => { setsuccessMessage(null) }, 5000);
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setPersons(persons.filter(deletedPerson => person.id !== deletedPerson.id))
          setErrorMessage(`Information of ${person.name} has already been deleted from server`)
          setTimeout(() => { setErrorMessage(null) }, 5000);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={nameFilter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <Success message={successMessage}/>

      <PersonForm onSubmit={handleSubmit}
        name={newName} handleNameChange={handleNameChange} 
        number={newPhoneNumber} handlePhoneNumberChange={handlePhoneNumberChange} />

      <h3>Numbers</h3>
      <Error message={errorMessage}/>

      <Persons persons={personsToDisplay} handleDelete={id => handleDelete(id)}/>
    </div>
    
  )
}

export default App