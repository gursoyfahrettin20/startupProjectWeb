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
    const defaultState = { id: 0 };
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
