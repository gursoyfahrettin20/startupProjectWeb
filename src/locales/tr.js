export const tr = {
    "translation": {
        "myProfile": "Hesabım",
        "singUp": "Kayıt Ol",
        "password": "Şifre",
        "passwordRepeat": "Şifre Tekrar",
        "passwordMismatch": "Girilen şifreler uyumlu değil",
        "displayName": "Tercih Edilen İsim",
        "username": "Kullanıcı Adı",
        "email": "E-Mail",
        "login": "Giriş",
        "logout": "Çıkış",
        "users": "Kullanıcılar",
        "preview": "< Geri",
        "next": "İleri >",
        "thisPage": "Bulunduğun Sayfa : ",
        "cancel": "İptal",
        "thereAreNoHoaxes": "Hoaxlar Bulunamadı",
        "loadOldHoaxes": "Eski Hoaxları Getir",
        "remember": "Hatırla",
        "newMember": "Yeni Üye Oluşturuluyor...",
        "loading": "Bekleyiniz",
        "edit": "Düzenle",
        "save": "Kaydet",
        "userPictureAdd": "Kullanıcı Resmi Ekle",
        "deleteThisUser": "Bu Kullanıcıyı Sil",
        "delete": "Sil",
        "administrator": "Yönetici",
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
