const GET_ALL_RELATIONSHIPS = "relationship/GET_ALL_RELATIONSHIP"
const CREATE_RELATIONSHIPS = "relationship/CREATE_RELATIONSHIP"
const DELETE_RELATIONSHIPS = "relationship/DELETE_RELATIONSHIP"
const ADD_RELATIONSHIPS = "relationship/ADD_RELATIONSHIP"
const EDIT_RELATIONSHIPS = "relationship/EDIT_RELATIONSHIP"

const getRelationshipsAction = (relationships) => ({
    type: GET_ALL_RELATIONSHIPS,
    payload: relationships
})

// const createRelationshipAction = (relationship) => ({
//     type: CREATE_RELATIONSHIPS,
//     payload: relationship
// })

export const deleteRelationshipAction = (relationship) => ({
    type: DELETE_RELATIONSHIPS,
    payload: relationship
})

export const addRelationshipAction = (relationship) => ({
    type: ADD_RELATIONSHIPS,
    relationship
})

export const editRelationshipAction = (userId,relationships) => ({
    type: EDIT_RELATIONSHIPS,
    userId,
    relationships
})

export const getRelationships = () => async (dispatch, getState ) => {
    const response = await fetch('/api/relationships/')
    const data = await response.json();
    if (data.errors) {
        return;
    }

    dispatch(getRelationshipsAction(data.relationships, getState().session.user.id))
    return data.relationships;
}

export const createRelationship = (secondUserId,relationshipType) => async (dispatch) => {
    const response = await fetch('/api/relationships/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secondUserId, relationshipType })
    })

    const data = await response.json();
    if (data && data.errors) {
        return data.errors;
    }
    dispatch(getRelationshipsAction(data.relationships))
    return {}
}

export const editRelationship = (secondUserId, relationshipType ) => async (dispatch) => {
    console.log(secondUserId, relationshipType )
    const response = await fetch(`/api/relationships/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secondUserId, relationshipType })
    })
    const data = await response.json();
    dispatch(getRelationshipsAction(data.relationships))
    return data
    // const response = await fetch(`/api/relationships/edit`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ secondUserId, relationshipType })
    // })
    // const data = await response.json();
    // dispatch(getRelationshipsAction(data.relationships))
    // return data

}

export const blockRelationship = (secondUserId,relationshipType) => async (dispatch) => {
    const response = await fetch('/api/relationships/block', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secondUserId,relationshipType})
    })
    const data = await response.json();
    dispatch(getRelationshipsAction(data.relationships))
    if (data && data['checkerArray'].length > 0) {
        dispatch(postblockRelationship(data.checkerArray))
    }
    return data

}

export const postblockRelationship = (checkerArray) => async (dispatch) => {
    const response = await fetch('/api/relationships/postblock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkerArray)
    })
    const data = await response.json();
    dispatch(getRelationshipsAction(data.relationships))
    return data

}

export const unblockRelationship = (blockid) => async (dispatch) => {
    const response = await fetch('/api/relationships/unblock', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({blockid})
    })
    const data = await response.json();
    dispatch(getRelationshipsAction(data.relationships))
    return data

}
export const addcreateRelationship = (addid) => async (dispatch) => {
    const response = await fetch('/api/relationships/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({addid})
    })
    const data = await response.json();
    if(data && data.addId){
        dispatch(addRelationship(data.addId))
    } else{
        dispatch(getRelationshipsAction(data.relationships))
        return data
    }


}
export const addRelationship = (addid) => async (dispatch) => {
    const response = await fetch('/api/relationships/add', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({addid})
    })
    const data = await response.json();
    dispatch(getRelationshipsAction(data.relationships))
    return data

}
// export const deleteRelationship = (blockid) => async (dispatch) => {
//     const response = await fetch(`/api/relationships/`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({blockid})
//     });

//     const data = await response.json();
//     if (data.errors) {
//         return;
//     }
//     dispatch(getRelationshipsAction(data.relationships))
// }

// const NormalizeRelationship = (relationships) => {
//     const normRelationship = {}
//     relationships.forEach(relationship => {
//         normRelationship[relationship.id] = relationship
//     })
//     return normRelationship
// }

const initialState = { relationships: {} }

export default function reducer(state = initialState, action) {
    let newState;
    // let incoming, outgoing;
    switch (action.type) {
        case GET_ALL_RELATIONSHIPS:
            // incoming = {}
            // outgoing = {}

            return { relationships: action.payload }
        case CREATE_RELATIONSHIPS:
            newState = { relationships: { ...state.relationships } }
            newState.relationships[action.payload.id] = action.payload
            return newState
        case DELETE_RELATIONSHIPS:
            newState = { relationships: { ...state.relationships } }
            delete newState.relationships[action.payload]
            return newState
        case ADD_RELATIONSHIPS:
            newState = { relationships: { ...state.relationships } }
            newState.relationships[action.relationship.id] = action.relationship
            return newState;
        case EDIT_RELATIONSHIPS:
            newState = { relationships: { ...state.relationships } }
            newState.relationships[action.Id].name = action.name;
            return newState;
        default:
            return state;
        }
    }
