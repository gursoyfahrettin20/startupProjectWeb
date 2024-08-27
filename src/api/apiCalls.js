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
export const updateCategory = (body, token = null) => {
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
export const loadProduct = (page = 0, size = 10, token = null) => {
    return http.get(getBaseUrl() + `/products`, {params: {page, size}}, token);
}

// Ürün Bilgilerini Güncelleme Alanı.
export const updateProduct = (body, token = null) => {
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

// Ürün Resmi Listeleme Alanı.
export const listProductImage = (productId,token = null) => {
    return http.get(getBaseUrl() + `/productToImage/${productId}`, token);
}

// Ürün Resmi Silme Alanı.
export const deleteImage = (id, token = null) => {
    return http.delete(getBaseUrl() + `/productToImage/${id}`, token);
}

// ======================== Slider İşlemleri ===========================


// Slider Resmi Ekleme Alanı.
export const addSliderImage = (body, token = null) => {
    return http.post(getBaseUrl() + '/newSlider', body, token);
}

// Slider Resmi Listeleme Alanı.
export const listSliderImage = (token = null) => {
    return http.get(getBaseUrl() + `/slider`, token);
}

// Slider Bilgilerini Güncelleme Alanı.
export const updateSliderImage = (id, body, token = null) => {
    return http.put(getBaseUrl() + `/slider/${id}`, body, token);
}

// Slider Resmi Silme Alanı.
export const deleteSliderImage = (id, token = null) => {
    return http.delete(getBaseUrl() + `/slider/${id}`, token);
}


// ======================== News İşlemleri ===========================


// Slider Resmi Ekleme Alanı.
export const addNews = (body, token = null) => {
    return http.post(getBaseUrl() + '/newNews', body, token);
}

// Slider Resmi Listeleme Alanı.
export const listNews = (token = null) => {
    return http.get(getBaseUrl() + `/news`, token);
}

// Slider Bilgilerini Güncelleme Alanı.
export const updateNews = (id, body, token = null) => {
    return http.put(getBaseUrl() + `/news/${id}`, body, token);
}

// Slider Resmi Silme Alanı.
export const deleteNews = (id, token = null) => {
    return http.delete(getBaseUrl() + `/news/${id}`, token);
}


// ======================== Referans Kategori İşlemleri ===========================

// Referans Kategorisi Ekleme Alanı.
export const addReferencesCategories = (body, token = null) => {
    return http.post(getBaseUrl() + '/newCategoriesFinishedWorks', body, token);
}
// Referans Kategorisi listesini getirir.
export const loadReferencesCategory = () => {
    return http.get(getBaseUrl() + `/categoriesFinishedWorks`);
}

// Referans Kategorisi Bilgilerini Güncelleme Alanı.
export const updateReferencesCategory = (body, token = null) => {
    return http.put(getBaseUrl() + `/categoriesFinishedWorks`, body, token);
}

// Referans Kategorisi Bilgilerini Silme Alanı.
export const deleteReferencesCategory = (id, token = null) => {
    return http.delete(getBaseUrl() + `/categoriesFinishedWorks/${id}`, token);
}


// ======================== Referans Ürün İşlemleri ===========================

// Referans Ekleme Alanı.
export const addFinishedWorks = (body, token = null) => {
    return http.post(getBaseUrl() + '/newFinishedWorks', body, token);
}
// Referans listesini getirir.
export const loadFinishedWorks = (page = 0, size = 10, token = null) => {
    return http.get(getBaseUrl() + `/finishedWorks`, {params: {page, size}}, token);
}

// Referans Bilgilerini Güncelleme Alanı.
export const updateFinishedWorks = (body, token = null) => {
    return http.put(getBaseUrl() + `/finishedWorks`, body, token);
}

// Referans Bilgilerini Silme Alanı.
export const deleteFinishedWorks = (id, token = null) => {
    return http.delete(getBaseUrl() + `/finishedWorks/${id}`, token);
}

// Referans Resmi Ekleme Alanı.
export const addFinishedWorksImage = (body, token = null) => {
    return http.post(getBaseUrl() + '/newFinishedWorksToImage', body, token);
}

// Referans Resmi Listeleme Alanı.
export const listFinishedWorksImage = (productId,token = null) => {
    return http.get(getBaseUrl() + `/finishedWorksToImage/${productId}`, token);
}

// Referans Resmi Silme Alanı.
export const deleteFinishedWorksImage = (id, token = null) => {
    return http.delete(getBaseUrl() + `/finishedWorksToImage/${id}`, token);
}
