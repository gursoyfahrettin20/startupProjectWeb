export const en = {
    "translation": {
        "myProfile": "My Profile",
        "singUp": "Sing Up",
        "password": "Password",
        "passwordRepeat": "Password Repeat",
        "passwordMismatch": "Password Mismatch",
        "displayName": "Display Name",
        "username": "User Name",
        "email": "E-Mail",
        "login": "Login",
        "logout": "Logout",
        "users": "Users",
        "preview": "< Preview",
        "next": "Next >",
        "thisPage": "This Page : ",
        "cancel": "Cancel",
        "thereAreNoHoaxes": "There are no hoaxes",
        "loadOldHoaxes": "Load Old Hoaxes",
        "remember": "Remember",
        "newMember": "Creating a New Member...",
        "loading": "Loading"
    }
}


export const timeAgoTr = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde'],
    ][index];
}
