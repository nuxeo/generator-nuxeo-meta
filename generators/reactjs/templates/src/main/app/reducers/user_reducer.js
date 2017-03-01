import {
    SET_CURRENT_USER,
} from '../actions/user_actions';

const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.currentUser;
        default:
            return state;
    }
};

export default UserReducer;