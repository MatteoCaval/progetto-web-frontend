const fetchRiders = () => {
    return new Promise(((resolve, reject) => {
        resolve({
            data: [
                {
                    id: 1,
                    name: 'Paolo',
                    surname: 'Bitta',
                    email: 'paolo.bitta@gmail.com'
                },
                {
                    id: 2,
                    name: 'Vittorio',
                    surname: 'Ghini',
                    email: 'v.ghini@gmail.com'
                }
            ]
        })
    }))
}

const deleteRider = (riderId, token) => {
    return new Promise(((resolve, reject) => {
        resolve()
    }))
}

const createRider = (rider, token) => {
    return new Promise(((resolve, reject) => {
        resolve()
    }))
}


export const adminService = {
    fetchRiders,
    deleteRider,
    createRider
}