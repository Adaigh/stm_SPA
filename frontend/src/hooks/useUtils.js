export const formatPhone = (num) => {
    return num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}

export const capitalize = (str) => {
    return (str.charAt(0).toUpperCase() + str.slice(1))
}