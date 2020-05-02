export const UserActionTypes = {
    SET_USER: 'SET_USER'
}

export const setCurrentUser = (name) => {
    return {
        type: UserActionTypes.SET_USER,
        payload: {
            name: name
        }
    }
}
