
export const isValidCheck = (data) => {
    let _valid = true
    for (const [key, value] of Object.entries(data)) {
        _valid = value === false
    }
    return _valid;
}

export const turkishCharactersToEnglishCharacters = (data) => {
    let trToEnConvert = data.replaceAll('Ğ','g')
        .replaceAll('Ü','u')
        .replaceAll('Ş','s')
        .replaceAll('I','i')
        .replaceAll('İ','i')
        .replaceAll('Ö','o')
        .replaceAll('Ç','c')
        .replaceAll('ğ','g')
        .replaceAll('ü','u')
        .replaceAll('ş','s')
        .replaceAll('ı','i')
        .replaceAll('ö','o')
        .replaceAll('ç','c')
        .replaceAll(/[!@#$%^&*()\/\\\-+'_,.?":{}[\]`;|<>]/g,'')
    return trToEnConvert;
}

