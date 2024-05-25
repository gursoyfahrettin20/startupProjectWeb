
export const isValidCheck = (data) => {
    let _valid = true
    for (const [key, value] of Object.entries(data)) {
        _valid = value === false
    }
    return _valid;
}
