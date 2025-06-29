import axios from 'axios'

const api_key = import.meta.env.VITE_METEO_KEY

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const searchByCity = (query) => {
    return axios
        .get(`${baseUrl}?q=${query}&appid=${api_key}`)
        .then(response => response.data)
}

export default { searchByCity }