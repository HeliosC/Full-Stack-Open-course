import { useEffect, useState } from "react"
import meteoService from "../services/meteo"

const Countries = ({ countries, handleSelectCountry }) => {
    const [meteo, setMeteo] = useState(null)

    useEffect(() => {
        if(countries.length != 1)
            return 

        setMeteo(null)
        meteoService
            .searchByCity(countries[0].capital[0])
            .then((meteo) => {
                setMeteo(meteo)
            })
            .catch(console.error)
    },  [countries])


    const languageStyle = {
        textIndent: 32
    }

    const flagStyle = {
        height: 300
    }

    if(countries.length > 10) {
        return <div><p>Too many matched, specify another filter</p></div>
    } 
    if(countries.length > 1) {
        return <div>
            {countries.map(country => 
                <div key={country.name.common}>{country.name.common} <button onClick={() => handleSelectCountry(country)}>Show</button></div>
            )}
        </div>
    }
    if(countries.length == 1) {
        const country = countries[0]
        
        return (
            <div>
                <div>
                    <h1>{country.name.common}</h1>
                    <p>Capital: {country.capital.join(', ')}</p>
                    <p>Area: {country.area}</p>

                    <h1>Languages</h1>
                    <ul>{Object.values(country.languages).map(language => <li key={language} style={languageStyle}>{language}</li>)}</ul>

                    <br />
                    <img src={country.flags.svg} style={flagStyle}></img>
                </div>

                {meteo ? (
                    <div>
                        <h1>Weather in {meteo.name}</h1>
                        <p>Temperature: {(meteo.main.temp - 273.15).toFixed(2)} Celsius</p>
                        <img src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}/>
                        <p>Wind: {meteo.wind.speed} m/s</p>
                    </div>
                ) : (
                    <span></span>
                )}
            </div>
        )
    }

    if(countries.length == 0) {
        return <div>No matches found</div>
    }
}

export default Countries