const GET_ALL_RELATIONSHIPS = "relationship/GET_ALL_RELATIONSHIP"
const CREATE_RELATIONSHIPS = "relationship/CREATE_RELATIONSHIP"
const DELETE_RELATIONSHIPS = "relationship/DELETE_RELATIONSHIP"
const ADD_RELATIONSHIPS = "relationship/ADD_RELATIONSHIP"
const EDIT_RELATIONSHIPS = "relationship/EDIT_RELATIONSHIP"

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

export const editRelationshipAction = (userId,relationships) => ({
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

export const editRelationship = (secondUserId, relationshipType ) => async (dispatch) => {
    const response = await fetch('/api/relationships/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secondUserId, relationshipType })
    })
    const data = await response.json();
    dispatch(getRelationshipsAction(data.relationships))
    return {}
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
