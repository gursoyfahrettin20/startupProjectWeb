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
export const updateContact = (id, body, token = null, ourId) => {
    return http.put(getBaseUrl() + `/contact/${id}`, body, token, ourId);
}

// İletişim Bilgilerini Silme Alanı.
export const deleteContact = (id, token = null) => {
    return http.post(getBaseUrl() + `/contact/${id}`, token);
}

// ======================== Hakkımızda İşlemleri ===========================

// Hakkımızda Bilgilerini Güncelleme Alanı.
export const updateOurWeb = (id, body, token = null) => {
    return http.put(getBaseUrl() + `/ourWeb/${id}`, body, token);
}

// İletişim listesini getirir.
export const loadOurWeb = () => {
    return http.get(getBaseUrl() + `/ourWeb`);
}

// ======================== Kategori İşlemleri ===========================

// Kategori Ekleme Alanı.
export const addCategories = (body, token = null) => {
    return http.post(getBaseUrl() + '/newCategories', body, token);
}
// Kategori listesini getirir.
export const loadCategory = () => {
    return http.get(getBaseUrl() + `/categories`);
}

// Kategori Bilgilerini Güncelleme Alanı.
export const updateCategory= (body, token = null) => {
    return http.put(getBaseUrl() + `/categories`, body, token);
}

// Kategori Bilgilerini Silme Alanı.
export const deleteCategory = (id, token = null) => {
    return http.delete(getBaseUrl() + `/categories/${id}`, token);
}

// ======================== Ürün İşlemleri ===========================

// Ürün Ekleme Alanı.
export const addProduct = (body, token = null) => {
    return http.post(getBaseUrl() + '/newProducts', body, token);
}
// Ürün listesini getirir.
export const loadProduct = () => {
    return http.get(getBaseUrl() + `/products`);
}

// Ürün Bilgilerini Güncelleme Alanı.
export const updateProduct= (body, token = null) => {
    return http.put(getBaseUrl() + `/products`, body, token);
}

// Ürün Bilgilerini Silme Alanı.
export const deleteProduct = (id, token = null) => {
    return http.delete(getBaseUrl() + `/products/${id}`, token);
}

// Ürün Resmi Ekleme Alanı.
export const addProductImage = (body, token = null) => {
    return http.post(getBaseUrl() + '/newProductToImage', body, token);
}