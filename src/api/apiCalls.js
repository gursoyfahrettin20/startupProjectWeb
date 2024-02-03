import axios from "axios";
import http from "../lib/http";

// Dil değişimi için alan
export const changeLanguage = lang => {
    axios.defaults.headers['accept-language'] = lang;
}

// Genel url uzantısı
export const getBaseUrl = () => {
    return import.meta.env.VITE_REACT_APP_REST_SERVICE_URL;
}

// Yeni kullanıcı oluşturur.
export const singUp = body => {
    return http.post(getBaseUrl() + '/users', body);
}

// Kullanıcı'yı aktif hale getirir.
export const activateUser = (token) => {
    return http.patch(getBaseUrl() + `/users/${token}/active`);
}

