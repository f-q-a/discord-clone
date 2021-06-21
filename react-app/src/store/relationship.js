const GET_ALL_RELATIONSHIP = "relationship/GET_ALL_RELATIONSHIP"
const CREATE_RELATIONSHIP = "relationship/CREATE_RELATIONSHIP"
const DELETE_RELATIONSHIP = "relationship/DELETE_RELATIONSHIP"
const ADD_RELATIONSHIP = "relationship/ADD_RELATIONSHIP"
const EDIT_RELATIONSHIP = "relationship/EDIT_RELATIONSHIP"

const getRelationshipsAction = (relationships) => ({
    type: GET_ALL_RELATIONSHIPS,
    payload: relationships
})

const createRelationshipAction = (relationship) => ({
    type: CREATE_RELATIONSHIPS,
    payload: relationship
})

export const deleteRelationshipAction = (relationship) => ({
    type: DELETE_RELATIONSHIPS,
    payload: relationship
})

export const addRelationshipAction = (relationship) => ({
    type: ADD_RELATIONSHIPS,
    relationship
})

export const editRelationshipAction = (relation) => ({
    type: EDIT_RELATIONSHIPS,
    userId,
    relationships
})

export const getRelationships = () => async (dispatch) => {
    const response = await fetch('/api/relationships/')
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getRelationshipsAction(data.relationships))
    return data.relationships;
}

export const createRelationship = (secondUserId,relationshipType) => async (dispatch) => {
    const response = await fetch('/api/relationships/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secondUserId,relationshipType })
    })

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(createRelationshipAction(data.relationship))

    return data.relationship.id;
}

export const editRelationship = (secondUserId) => async (dispatch) => {
    const response = await fetch('/api/relationships/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({secondUserId})
    })

    if (response.ok) {
        const relation = await response.json();
        dispatch(editRelationshipAction(relation))
    };

}

export const deleteRelationship = (userId) => async (dispatch) => {
    const response = await fetch(`api/relationships/`, {
        method: 'DELETE'
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(deleteRelationshipAction(userId))
}

const NormalizeRelationship = (relationships) => {
    const normRelationship = {}
    relationships.forEach(relationship => {
        normRelationship[relationship.id] = relationship
    })
    return normRelationship
}

const initialState = { relationships: {} }

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_RELATIONSHIPS:
            return { relationships: NormalizeRelationship(action.payload) }
        case CREATE_RELATIONSHIP:
            newState = { relationships: { ...state.relationships } }
            newState.relationships[action.payload.id] = action.payload
            return newState
        case DELETE_RELATIONSHIP:
            newState = { relationships: { ...state.relationships } }
            delete newState.relationships[action.payload]
            return newState
        case ADD_RELATIONSHIP:
            newState = { relationships: { ...state.relationships } }
            newState.relationships[action.relationship.id] = action.relationship
            return newState;
        case EDIT_RELATIONSHIP:
            newState = { relationships: { ...state.relationships } }
            newState.relationships[action.Id].name = action.name;
            return newState;
        default:
            return state;
        }
    }
