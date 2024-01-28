import axios from "axios";

export const changeLanguage = lang => {
    axios.defaults.headers['accept-language'] = lang;
}

export const getBaseUrl = () => {
     return import.meta.env.VITE_REACT_APP_REST_SERVICE_URL;
}

export const saveUser = body => {
    return axios.post(getBaseUrl() + '/users', body);
}

export const singUp = body => {
    return axios.post(getBaseUrl() + '/users', body);
}

export const login = data => {
    return axios.post(getBaseUrl() + '/auth', {}, {auth: data});
}

export const getUsers = (page, size) => {
    return axios.get(getBaseUrl() + `/users?currentPage=${page ? page : 0}&pageSize=${size ? size : 3}`);
}

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if (isLoggedIn) {
        let authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const getUser = (userName) => {
    return axios.get(getBaseUrl() + `/users/${userName}`);
}

export const updateUser = (userName, body) => {
    return axios.put(getBaseUrl() + `/users/${userName}`, body);
}

export const postHoax = hoax => {
    return axios.post(getBaseUrl() + "/hoaxes", hoax);
}

export const getHoaxes = (userName, page = 0) => {
    const path = userName ? `/users/${userName}/hoaxes?currentPage=` : "/hoaxes?currentPage="
    return axios.get(getBaseUrl() + path + page);
}

export const getOldHoaxes = (id, userName) => {
    const path = userName ? `/users/${userName}/hoaxes/${id}` : `/hoaxes/${id}`;
    return axios.get(getBaseUrl() + path);
}
