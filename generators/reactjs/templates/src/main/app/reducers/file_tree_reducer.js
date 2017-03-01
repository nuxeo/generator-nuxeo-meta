import { merge } from 'lodash';

import {
    SET_CURRENT_NODE,
    SET_ROOT_NODE,
    ADD_CHILD_NODES,
    DELETE_NODE,
    CREATE_NODE,
    UPDATE_NODE,
    ATTACH_FILE,
    SET_PROPERTY,
} from '../actions/tree_actions';

const defaultState = {
  root: {},
  currentNode: {}
};

const FileTreeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_NODE:
            return merge({}, state, {currentNode: action.currentNode});
        case SET_ROOT_NODE:
            return merge({}, state, { root: action.root });
        case ADD_CHILD_NODES:
            action.childNodes.forEach((child) => {
                action.parentNode.addChild(child);
            });
            return merge({}, state, { root: state.root });
        case CREATE_NODE:
            action.parentNode.addChild(action.childNode);
            return merge({}, state, { root: state.root });
        case DELETE_NODE:
            action.node.parent.removeChild(action.node);
            return merge({}, state, { root: state.root });
        case UPDATE_NODE:
            action.node.item = action.newDoc;
            return merge({}, state, { root: state.root });
        case ATTACH_FILE:
            action.node.item = action.newDoc;
            return merge({}, state, { root: state.root });
        case SET_PROPERTY:
            action.node[action.property] = action.value;
            return merge({}, state, { root: state.root });
        default:
            return state;
    }
};

export default FileTreeReducer;