import axios from 'axios' 

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = newPerson => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
}

const update = person => {
    return axios
        .put(`${baseUrl}/${person.id}`, person)
        .then(response => response.data)
}

const remove = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

export default { getAll, create, update, remove }