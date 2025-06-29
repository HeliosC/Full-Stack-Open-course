import { useState } from "react"
import countryService from './services/countries'
import Countries from "./components/Countries"

const App = () => {  
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    countryService.searchByName(input)
      .then((countries) => {
        setCountries(countries)
      })
      .catch(() => {        
        setCountries([])
      })
  }

  const handleSelectCountry = (country) => {
    setCountries([country])
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        find countries <input value={input} onChange={handleInputChange} />
      </form>

      <Countries countries={countries} handleSelectCountry={handleSelectCountry} />
    </>
  )
}

export default App