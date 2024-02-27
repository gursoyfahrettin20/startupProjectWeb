/*
    Burası Login olan kullanıcıyı localStorage ın Cache belleğinde tutuyor.
 */
export function storeAuthState(auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
}

/*
    Burası Login olan kullanıcıyı localStorage ın Cache belleğinde'den alıyor, dolayısı ile sayfa refresh yapıldığında kullanıcı bilgileri,
    kaybolmamış oluyor.
 */

export function loadAuthState() {
    const defaultState = {id: 0};
    const authStateInStorage = localStorage.getItem('auth');

    if (!authStateInStorage) {
        return defaultState;
    }
    try {
        return JSON.parse(authStateInStorage);
    } catch (error) {
        return defaultState;
    }
}

/*
    Burası Login olan kullanıcıının token bilgilerini localStorage ın Cache belleğinde tutuyor.
 */
export function storeToken(token) {
    if (token) {
        localStorage.setItem("token", JSON.stringify(token));
    } else {
        localStorage.removeItem("token")
    }
}

/*
    Burası Login olan kullanıcıının token bilgilerini localStorage ın Cache belleğinde'den alıyor, dolayısı ile sayfa refresh yapıldığında kullanıcı
    token bilgileri kaybolmamış oluyor ve bu sayede yekilendirme işlemlerini kolaylıkla yapılmakta.
 */
export function loadToken() {
    const tokenInString = localStorage.getItem("token");
    if (!tokenInString) {
        return null;
    }
    try {
        return JSON.parse(tokenInString);
    } catch (e) {
        return null;
    }
}