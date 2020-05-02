const INITIAL_STATE = {
    currentUser: "Matteo" // set to null
}

const userReducer = (state = INITIAL_STATE, action={}) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default userReducer
