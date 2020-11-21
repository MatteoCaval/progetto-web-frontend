const errorCode = 404
const errorDescription = 'description'

export const sampleErrorResponse = {
    response: {
        code: errorCode,
        data: {
            description: errorDescription
        }
    }
}

export const sampleMappedError = {
    code: errorCode,
    description: errorDescription
}