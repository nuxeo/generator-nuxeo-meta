import { connect } from 'react-redux';
import {
    setCurrentNode,
    setRootNode,
    fetchChildren,
    deleteDocument,
    createDocument,
    attachFile,
    updateDocument
} from '../../actions/tree_actions';
import { flashErrors } from '../../actions/error_actions';

import FileTree from './file_tree.jsx';
import MainView from './main_view.jsx';
import RightMainView from './right_main_view';
import FileView from './right_main_view_components/file_view';
import FolderView from './right_main_view_components/folder_view';
import CreateDocumentForm from './right_main_view_components/create_document_form.jsx';
import ShowACL from './right_main_view_components/show_acl.jsx';
import ShowAudit from './right_main_view_components/show_audit.jsx';
import ShowTask from './right_main_view_components/show_task.jsx';
import ShowWorkFlow from './right_main_view_components/show_workflow.jsx';
import AttachFile from './right_main_view_components/attach_file.jsx';
import EditDocument from './right_main_view_components/edit_document.jsx'

const mapStateToProps = ({ fileTree, currentUser }) => ({
    fileTree: fileTree,
    currentUser: currentUser
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentNode: (node) => dispatch(setCurrentNode(node)),
    flashErrors: (errors) => dispatch(flashErrors(errors)),
    setRootNode: (rootNode) => dispatch(setRootNode(rootNode)),
    fetchChildren: (parentNode) => dispatch(fetchChildren(parentNode)),
    deleteDocument: (node, callback) => dispatch(deleteDocument(node, callback)),
    createDocument: (parentNode, doc, callback) => dispatch(createDocument(parentNode, doc, callback)),
    updateDocument: (node, callback) => dispatch(updateDocument(node, callback)),
    attachFile: (node, upload, callback) => dispatch(attachFile(node, upload, callback)),
    dispatch: (action) => dispatch(action),
});

// const DocumentViewContainers = [
//     FileTree,
//     MainView,
//     RightMainView,
//     FileView,
//     FolderView,
//     CreateDocumentForm,
//     ShowACL,
//     ShowAudit,
//     ShowTask,
//     ShowWorkFlow,
//     AttachFile,
//     EditDocument
//                     ].reduce((containers, component) => {
//     containers[`${component.name}Container`] = connect(mapStateToProps, mapDispatchToProps)(component)
//     return containers
// }, {});



export const MainViewContainer = connect(mapStateToProps, mapDispatchToProps)(MainView);
export const RightMainViewContainer = connect(mapStateToProps, mapDispatchToProps)(RightMainView);
export const FileViewContainer = connect(mapStateToProps, mapDispatchToProps)(FileView);
export const FolderViewContainer = connect(mapStateToProps, mapDispatchToProps)(FolderView);
export const FileTreeContainer = connect(mapStateToProps, mapDispatchToProps)(FileTree);
export const CreateDocumentFormContainer = connect(mapStateToProps, mapDispatchToProps)(CreateDocumentForm);
export const ShowACLContainer = connect(mapStateToProps, mapDispatchToProps)(ShowACL);
export const ShowAuditContainer = connect(mapStateToProps, mapDispatchToProps)(ShowAudit);
export const ShowTaskContainer = connect(mapStateToProps, mapDispatchToProps)(ShowTask);
export const ShowWorkFlowContainer = connect(mapStateToProps, mapDispatchToProps)(ShowWorkFlow);
export const AttachFileContainer = connect(mapStateToProps, mapDispatchToProps)(AttachFile);
export const EditDocumentContainer = connect(mapStateToProps, mapDispatchToProps)(EditDocument);


// export default DocumentViewContainers;




