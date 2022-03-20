// constants
const GET_USERS = "session/GET_USERS"
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"
const EDIT_USER = "user/EDIT_USER"
// action creators


const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

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
        return data
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

export const editUser = ({userId,username,email,image,password,repeatPassword}) => async (dispatch) => {
    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("repeatPassword", repeatPassword)
    formData.append("image", image)

    const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: formData,
    })
    const data = await response.json();
    if (data && data.errors){
        return data
    } else {
        // dispatch(setUser(data.users))
    }
}

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch(`/api/users/`)
    const data = await response.json();
    if (data && data.errors){
        return data
    } else {
        dispatch(getUsers(data))
    }
}


const NormalizeUser = (users) => {
    const normUser = {}
    users.forEach(user => {
        normUser[user.id] = user
    })
    return normUser
}
const initialState = {user: null}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {user: NormalizeUser(action.payload) }
        case SET_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        default:
            return state;
    }
}
