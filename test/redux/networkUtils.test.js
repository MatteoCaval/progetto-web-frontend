import {getErrorResponseDescription, mapNetworkError} from "../../src/redux/networkUtils";

describe("getErrorResponseDescription", () => {

    it('shoul get error description if present', () => {
        const description = "error description"
        let error = {
            response: {
                data: {
                    description: description
                }
            }
        }
        expect(getErrorResponseDescription(error)).toBe(description)
    })

    it('shoul get fallback empty message on missing description', () => {
        const description = "error description"
        let error = {
            response: {
                data: null
            },
        }
        expect(getErrorResponseDescription(error)).toBe('')
    })

})


describe('mapNetworkError', () => {
    it('should map server error response with description', () => {
        const description = 'description'
        const errorCode = 404
        let error = {
            response: {
                code: errorCode,
                data: {
                    description: description
                }
            }
        }
        expect(mapNetworkError(error)).toMatchObject({
            code: errorCode,
            description: description
        })

    });

    it('should map server error response without description', () => {
        const errorCode = 404
        let error = {
            response: {
                code: errorCode,
                data: {
                }
            }
        }
        expect(mapNetworkError(error)).toMatchObject({
            code: errorCode,
            description: ''
        })

    });

});