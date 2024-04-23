import axios from "axios";
import http from "../lib/http";

// Dil değişimi için alan
export const changeLanguage = lang => {
    axios.defaults.headers['accept-language'] = lang;
}

// Genel url uzantısı
export const getBaseUrl = () => {
    return "http://localhost:5555/api/v1";
}

// ======================== Kullanıcı İşlemleri ===========================

// Yeni kullanıcı oluşturur.
export const singUp = body => {
    return http.post(getBaseUrl() + '/users', body);
}

// Kullanıcı'yı aktif hale getirir.
export const activateUser = (token) => {
    return http.patch(getBaseUrl() + `/users/${token}/active`);
}

// Kullanıcıları listeler.
export const loadUser = (page = 0, size = 10, token = null) => {
    return http.get(getBaseUrl() + `/users`, {params: {page, size}}, token);
}

// Kullanıcı'yı id sine göre getirir.
export const getUser = (id) => {
    return http.get(getBaseUrl() + `/users/${id}`);
}

// Kullanıcı girişi.
export const Login = body => {
    return http.post(getBaseUrl() + '/auth', body);
}

// Kullanıcı Kendi Bilgilerini Güncelleme Alanı.
export const updateUser = (id, body) => {
    return http.put(getBaseUrl() + `/users/${id}`, body);
}

//Kullanıcıyı admin panel sisteminden çıkış / logout İşlemleri
export const logout = body => {
    return http.post(getBaseUrl() + '/logout');
}

// Kullanıcı'yı id sine göre siler.
export const deleteUser = (id) => {
    return http.delete(getBaseUrl() + `/users/${id}`);
}


// Kullanıcı şifresini unuttuğunda yeni password için token isteiği attığı alan.
export function passwordResetRequest(body) {
    return http.post(getBaseUrl() + '/users/password-reset', body);
}

// Kullanıcı şifresini unuttuğunda yeni password setlediği alan.
export const resetPassword = (token, body) => {
    return http.patch(getBaseUrl() + `/users/${token}/password`, body);
}

// ======================== İletişim İşlemleri ===========================

// İletişim listesini getirir.
export const loadContact = () => {
    return http.get(getBaseUrl() + `/contact`);
}

// Yeni İletişim Bilgilerini Ekleme Alanı.
export const newAddContact = (id, body, token = null) => {
    return http.post(getBaseUrl() + `/newContact/${id}`, body, token);
}

// İletişim Bilgilerini Güncelleme Alanı.
export const updateContact = (id, body, token = null) => {
    return http.put(getBaseUrl() + `/contact/${id}`, body, token);
}
// İletişim Bilgilerini Silme Alanı.
export const deleteContact = (id, token = null) => {
    return http.post(getBaseUrl() + `/contact/${id}`, token);
}