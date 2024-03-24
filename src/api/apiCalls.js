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
    return http.post(getBaseUrl() + '/api/v1/users', body);
}

// Kullanıcı'yı aktif hale getirir.
export const activateUser = (token) => {
    return http.patch(getBaseUrl() + `/api/v1/users/${token}/active`);
}

// Kullanıcıları listeler.
export const loadUser = (page = 0, size = 10) => {
    return http.get(getBaseUrl() + `/api/v1/users`, {params: {page, size}});
}

// Kullanıcı'yı id sine göre getirir.
export const getUser = (id) => {
    return http.get(getBaseUrl() + `/api/v1/users/${id}`);
}

// Kullanıcı girişi.
export const Login = body => {
    return http.post(getBaseUrl() + '/api/v1/auth', body);
}

// Kullanıcı Kendi Bilgilerini Güncelleme Alanı.
export const updateUser = (id, body) => {
    return http.put(getBaseUrl() + `/api/v1/users/${id}`, body);
}

//Kullanıcıyı admin panel sisteminden çıkış / logout İşlemleri
export const logout = body => {
    return http.post(getBaseUrl() + '/api/v1/logout');
}