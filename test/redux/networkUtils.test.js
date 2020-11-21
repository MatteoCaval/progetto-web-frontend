import {getErrorResponseMessage} from "../../src/redux/networkUtils";

describe("getErrorResponseMessage", () => {

    it('shoul get error description if present', () => {
        const description = "error description"
        let error = {
            response: {
                data: {
                    description: description
                }
            }
        }
        expect(getErrorResponseMessage(error)).toBe(description)
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
        expect(getErrorResponseMessage(error)).toBe(fallBackdescription)
    })

})