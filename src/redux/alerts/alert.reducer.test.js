import alertReducer from "./alert.reducer";


describe('alert reducer', () => {

    it('should return initial state', () => {
        expect(alertReducer()).toEqual({})
    })

})