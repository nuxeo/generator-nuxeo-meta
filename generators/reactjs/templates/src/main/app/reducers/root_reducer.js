import { combineReducers } from 'redux';
import ErrorsReducer from './errors_reducer';
import FileTreeReducer from './file_tree_reducer';
import UserReducer from './user_reducer';

export default combineReducers({
    errors: ErrorsReducer,
    fileTree: FileTreeReducer,
    currentUser: UserReducer
});