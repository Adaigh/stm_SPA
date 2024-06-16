export const formatPhone = (num) => {
    return num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}

export const capitalize = (str) => {
    return (str.charAt(0).toUpperCase() + str.slice(1))
}

export const stdHeaders = (user) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.webToken}`
    }
}

export const standardStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}