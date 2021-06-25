// constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"
const EDIT_USER = "user/EDIT_USER"
// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER,
})

export const editUserAction =  (userId) => ({
    type: EDIT_USER,
    payload: userId

})

// thunks

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))
}

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    } else {
        dispatch(setUser(data))
        return {}
    }

}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
    return data;
};


export const signUp = (username, email, password) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return data
    }
    dispatch(setUser(data))
    return {}
}

export const editUser = (userId,username,email,image,password,repeatPassword) => async (dispatch) => {

    const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username,email,image,password,repeatPassword })
    })
    const data = await response.json();
    console.log("THUNK_____",data)
    if (data && data.errors){
        return data
    } else {
        dispatch(setUser(data))
    }
}

const initialState = {user: null}

export default function reducer(state = initialState, action) {
        console.log(action.payload)
    switch (action.type) {
        case SET_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        default:
            return state;
    }
}
