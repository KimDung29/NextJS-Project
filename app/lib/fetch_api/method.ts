
const postMethod = async(path: string, value: any,) => {
    return await fetch(`/api/${path}`, {
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })

}
const putMethod = async(path: string, value: any,) => {
    return await fetch(`/api/${path}`, {
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    })

}
const getMethod = async(path: string, value: any,) => {
    return await fetch(`/api/${path}`, {
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })

}
const uploadMethod = async(path: string, value: any,) => {
    return await fetch(`/api/${path}`, {
        body: value,
        method: 'POST'
    })

}


export {
    postMethod,
    putMethod,
    getMethod,
    uploadMethod
};