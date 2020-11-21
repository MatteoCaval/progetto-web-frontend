import {getErrorResponseDescription} from "../../src/redux/networkUtils";

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

    it('shoul get fallback message on missing description', () => {
        const description = "error description"
        const fallBackdescription = 'fallback'
        let error = {
            response: {
                data: null
            },
            message: fallBackdescription
        }
        expect(getErrorResponseDescription(error)).toBe(fallBackdescription)
    })

})