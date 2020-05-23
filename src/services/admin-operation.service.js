const fetchRiders = () => {
    return new Promise(((resolve, reject) => {
        resolve({
            data: [
                {
                    name: 'Paolo',
                    surname: 'Bitta',
                    email: 'paolo.bitta@gmail.com'
                },
                {
                    name: 'Vittorio',
                    surname: 'Ghini',
                    email: 'v.ghini@gmail.com'
                }
            ]
        })
    }))
}

export const adminService = {
    fetchRiders
}