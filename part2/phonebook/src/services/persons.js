import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then(({ data }) => data);
};

const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject).then(({ data }) => data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(({ data }) => data);
};

const updatePerson = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(({ data }) => data);
};

const persons = { getAll, createPerson, deletePerson, updatePerson };

export default persons;
