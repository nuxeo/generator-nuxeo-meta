import NuxeoUtils from '../utils/nuxeo_utils';
import TreeNode from '../tree_node/tree_node';

export const SET_CURRENT_NODE = "SET_CURRENT_NODE";
export const SET_ROOT_NODE = "SET_ROOT_NODE";
export const ADD_CHILD_NODES = "ADD_CHILD_NODES";
export const DELETE_NODE = "DELETE_NODE";
export const CREATE_NODE = "CREATE_NODE";
export const ATTACH_FILE = "ATTACH_FILE";
export const UPDATE_NODE = "UPDATE_NODE";
export const SET_PROPERTY = "SET_PROPERTY";


export function setCurrentNode(node) {
    return {
        type: SET_CURRENT_NODE,
        currentNode: node
    }
}

export function setRootNode() {
    return (dispatch) => {
        NuxeoUtils.crudUtil({
            success: (doc) => {
                let rootNode = new TreeNode(doc);
                dispatch({type: SET_ROOT_NODE, root: rootNode});
                dispatch(setCurrentNode(rootNode));
                fetchChildren(rootNode)(dispatch);
            }
        })
    }
}

export function fetchChildren(node) {
    return (dispatch) => {
        if (!node.fetchedChildren) {
            NuxeoUtils.crudUtil({
                path: node.item.uid,
                adapter: 'children',
                success: (docs) => {
                    node.fetchedChildren = true;
                    let childNodes = docs.entries.map((entry) => {
                        return new TreeNode(entry)
                    });
                    dispatch({
                        type: ADD_CHILD_NODES,
                        parentNode: node,
                        childNodes: childNodes
                    })
                }
            });
        }

    }
}

export function deleteDocument(node, callback){
    return (dispatch) => {
        NuxeoUtils.crudUtil({
                method: "delete",
                path: node.item.uid,
                success: (doc) => {
                    dispatch({
                        type: DELETE_NODE,
                        node: node
                    });
                    if (callback) {
                       callback();
                    }
            }
        })
    }
}


export function createDocument(parentNode, doc, callback){
    return (dispatch) => {
        NuxeoUtils.crudUtil({
            method: "create",
            path: parentNode.item.uid,
            data: doc,
            success: (doc) => {
                let childNode = new TreeNode(doc);
                dispatch({
                    type: CREATE_NODE,
                    parentNode: parentNode,
                    childNode: childNode,
                });
                if (callback) {
                    callback()
                }
            }
        })
    }
}

export function updateDocument(node, callback){
    return (dispatch) => {
        NuxeoUtils.crudUtil({
            method: 'update',
            path: node.item.uid,
            data: node.item,
            success: (doc) => {
                dispatch({
                    type: UPDATE_NODE,
                    node: node,
                    newDoc: doc
                });
            }
        });
        if (callback) {
            callback();
        }
    }
}

export function attachFile(node, upload, callback) {
    return function(dispatch) {
        let success = (newDoc) => {
            dispatch({
                type: ATTACH_FILE,
                node: node,
                newDoc: newDoc,
            });
            if (callback) {
                callback();
            }
        };
        NuxeoUtils.attachFile(node, upload, success);
    }
}

export function setProperty(node, property, value) {
    return {
        type: SET_PROPERTY,
        node: node,
        property: property,
        value: value
    }
}

const TreeActions = ["acl", "workflow", "task", "audit"].reduce((methods, adapter) => {
   methods[`get${adapter}`] = (node) => {
       return (dispatch) => {
           let success = (res) => {
               dispatch(setProperty(node, adapter, res));
           };
           NuxeoUtils.crudUtil({
               method: "get",
               path: node.item.uid,
               adapter: `${adapter}`,
               success: success
           });
       }
   };
   return methods
}, {});

export default TreeActions;