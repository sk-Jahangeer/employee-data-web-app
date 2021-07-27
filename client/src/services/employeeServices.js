import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const createEmployee = (data) => {
    return axios.post(apiUrl, data);
};

export const getAllEmployees = () => {
    return axios.get(apiUrl);
};

export const getEmployeeById = (id) => {
    return axios.get(`${apiUrl}/${id}`);
};

export const updateEmployee = (id, data) => {
    return axios.put(`${apiUrl}/${id}`, data);
};

export const deleteEmployee = (id) => {
    return axios.delete(`${apiUrl}/${id}`);
};
