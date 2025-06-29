import axios from 'axios'

const baseUrl = "https://restcountries.com/v3.1"

const searchByName = (query) => {
    return axios
        .get(`${baseUrl}/name/${query}`)
        .then(response => response.data)
}

export default { searchByName }