import NuxeoUtils from '../utils/nuxeo_utils';

export const SET_CURRENT_USER = "SET_CURRENT_USER";


export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        currentUser: user
    }
}

export function getCurrentUser(signIn, callback) {
    return (dispatch) => {
        NuxeoUtils.signIn(signIn, callback)
    }
}
