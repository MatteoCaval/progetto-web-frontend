/**
 * Extracts the error message send by the server inside the error response
 * @param error an http error
 */
export const getErrorResponseDescription = error => {
    if (error.response != null && error.response.data != null && error.response.data.description != null) {
        return error.response.data.description
    } else {
        return error.message
    }
}

