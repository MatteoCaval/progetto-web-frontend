import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import AuthActionType from "../../../redux/auth/auth.actionType";
import { fetchCurrentUser, loginUser, logout, registerUser } from "../../../redux/user/user.actions";
import UserActionTypes from "../../../redux/user/user.actionTypes";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('axios');


describe('user actions', () => {

    const stateWToken = { user: { data: { token: 'token' } } }

    it('should create SUCCESS action on login success', () => {
        const userData = { email: 'email@prova.it' }
        const expectedAction = {
            type: AuthActionType.LOGIN_SUCCESS,
            payload: userData
        }

        axios.post.mockImplementation(() => Promise.resolve({ data: userData }))

        const store = mockStore({})

        return store.dispatch(loginUser(userData.email, 'password'))
            .then(() => expect(store.getActions()).toContainEqual(expectedAction))

    })

    it('should create SUCCESS action on registration success', () => {
        const userData = { email: 'email@prova.it' }
        const expectedAction = {
            type: AuthActionType.REGISTRATION_SUCCESS,
            payload: userData
        }

        axios.post.mockImplementation(() => Promise.resolve({ data: userData }))

        const store = mockStore({})

        return store.dispatch(registerUser(userData))
            .then(() => expect(store.getActions()).toContainEqual(expectedAction))

    })

    it('should create SUCCESS action on logout success', () => {
        const expectedAction = {
            type: AuthActionType.LOGOUT_SUCCESS
        }

        axios.post.mockImplementation(() => Promise.resolve())

        const store = mockStore(stateWToken)

        return store.dispatch(logout())
            .then(() => expect(store.getActions()).toContainEqual(expectedAction))

    })

    it('should generate SUCCESS action on fetchCurrentUser successfull', () => {
        const userData = { email: 'email@prova.it' }
        const expectedAction = [{
            type: UserActionTypes.FETCH_CURRENT_USER_SUCCESS,
            payload: userData
        }]

        axios.get.mockImplementation(() => Promise.resolve({ data: userData }))

        const store = mockStore(stateWToken)

        return store.dispatch(fetchCurrentUser())
            .then(() => expect(store.getActions()).toEqual(expect.arrayContaining(expectedAction)))
    })

})
