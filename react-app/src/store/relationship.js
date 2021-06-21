const GET_ALL_RELATIONSHIPS = "relationship/GET_ALL_MEMBERS"
const EDIT_RELATIONSHIP = "relationship/EDIT_MEMBERS"
const REMOVE_RELATIONSHIP= "relationship/REMOVE_MEMBER"
const ADD_RELATIONSHIP = "relationship/ADD_MEMBER"

const getRelationship = (relationship) => ({
    type: GET_ALL_RELATIONSHIPS,
    payload: relationship
})

export const editMemberAction = (relationshipType) => ({
    type: EDIT_RELATIONSHIP,
    relationshipType
})

export const removeRelationship = () => ({
    type: REMOVE_RELATIONSHIP
})

export const addMemberAction = (userId, username) => ({
    type: ADD_RELATIONSHIP,
    userId,
    username
})

export const getUsersForSidebar = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/relationships`)
    const relationship = await response.json();
    if (relationship.errors) {
        return;
    }

    const relationshipArray = []

    for (const key in relationship.relationship) {
        relationshipArray.push(relationship.relationship[key])
    }
    dispatch(getRelationshipAction(relationshipArray))
}


const NormalizeRelationship = (messages) => {
    const normRelationship = {}
    messages.forEach(message => {
        normRelationship[message.id] = message
    })
    return NormalizeRelationship
}

const initialState = { relationship: {} }

export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_RELATIONSHIP:
            return { relationship: NormalizeRelationship(action.payload) }
        case EDIT_RELATIONSHIPS:
            newState = { relationship: { ...state.relationship} }
            newState.relationship[action.id].relationship = action.relationship;
            return newState;
        case REMOVE_RELATIONSHIP:
            newState = { relationship: { ...state.relationship } }
            delete newState.relationship[action.userId]
            return newState
        case ADD_RELATIONSHIP:
            newState = { relationship: { ...state.relationship } }
            newState.relationship[action.userId] = {
                second_user_id: action.second_user_id,
                relationship: action.relationship
            }
            return newState
        default:
            return state;
    }
}
