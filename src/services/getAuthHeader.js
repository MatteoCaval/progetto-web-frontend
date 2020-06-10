export default function getAuthHeader(token) {
    return ({
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
