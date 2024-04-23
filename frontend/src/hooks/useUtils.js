export const formatPhone = (num) => {
    return num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}