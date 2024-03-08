
const postMethod = async(path: string, value: any,) => {
    return await fetch(`/api/${path}`, {
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })

}


export {
    postMethod
};