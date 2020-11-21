/**
 * Extracts the error message send by the server inside the error response
 * @param error an http error
 */
export const getErrorResponseDescription = error => {
    if (error.response != null && error.response.data != null && error.response.data.description != null) {
        return error.response.data.description
    } else {
        return ""
    }
}


export const mapNetworkError = error => {
    if (error.response) {
        // client received an error response (5xx, 4xx)
        return {
            code: error.response.code,
            description: getErrorResponseDescription(error)
        }
    } else if (error.request) {
        return {
            code: null,
            description: "Network error"
        }
    } else {
        return {
            code: null,
            description: "An error occurred"
        }
    }
}

