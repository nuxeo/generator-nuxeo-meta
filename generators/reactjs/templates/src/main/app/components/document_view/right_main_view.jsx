import React from 'react';
import DocumentTypeConstants from '../../constants/document_type_constants';

import {
    FolderViewContainer,
    FileViewContainer,
    CreateDocumentFormContainer,
    ShowACLContainer,
    ShowAuditContainer,
    ShowTaskContainer,
    ShowWorkFlowContainer,
    AttachFileContainer,
    EditDocumentContainer,
} from './document_view_container';

const showWorkingButtons = ['ACL', 'Work Flow', 'Tasks', 'Audit', 'Edit'];

const containers = DocumentTypeConstants.containers.concat(DocumentTypeConstants.defaultContainers);

class RightMainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWorkingButton: undefined
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.fileTree.currentNode != this.props.fileTree.currentNode) {
      this.setState({showWorkingButton: undefined});
    }
  }

  _deleteCurrentFile(node, e){
    e.preventDefault();
    let callback = () => {
      this.props.setCurrentNode(this.props.fileTree.currentNode.parent)
    };
    this.props.deleteDocument(node, callback);
  }

  _setWorkingButton(buttonText, e){
    if (this.state.showWorkingButton === buttonText) {
      this.setState({showWorkingButton: undefined});
    } else {
      this.setState({showWorkingButton: buttonText});
    }
  }

  render() {
    const workingButtons = {
      "Create Document": CreateDocumentFormContainer,
      "ACL": ShowACLContainer,
      "Work Flow": ShowWorkFlowContainer,
      "Tasks": ShowTaskContainer,
      "Audit": ShowAuditContainer,
      "Attach File": AttachFileContainer,
      "Edit": EditDocumentContainer,
    };

    let currentNode = this.props.fileTree.currentNode;
    let fileProperties = currentNode.item.properties;
    let propertiesList = (
        <div>
          Creator : {fileProperties["dc:creator"]} <br/>
          Last Contributor : {fileProperties["dc:lastContributor"]} <br/>
          Created At : { new Date(fileProperties["dc:created"]).toString() } <br/>
          Modified At : { new Date(fileProperties["dc:modified"]).toString() }
        </div>
    );

    let buttonList = showWorkingButtons.map((button) => {
      return (
        <button key={button} onClick={this._setWorkingButton.bind(this,`${button}`)} className="submit-button">{`${button}`}</button>
      );
    });

    let showWorking;
    if (this.state.showWorkingButton) {
      let props = {
        currentNode: currentNode,
        _setWorkingButton: this._setWorkingButton,
        dispatch: this.props.dispatch,
        setCurrentNode: this.props.setCurrentNode
      };
      showWorking = React.createElement(workingButtons[this.state.showWorkingButton]);
    }

    let title = fileProperties['dc:title'];

    let fileOrFolderView;
    let attachFileOrCreate;
    if (containers.includes(currentNode.item.type)){
      attachFileOrCreate = <button onClick={this._setWorkingButton.bind(this,"Create Document")} className="submit-button">Create Document</button>
      fileOrFolderView = <FolderViewContainer/>;
    } else {
      attachFileOrCreate = <button onClick={this._setWorkingButton.bind(this,"Attach File")} className="submit-button">Attach File</button>;
      fileOrFolderView = <FileViewContainer/>;
    }

    return (
      <div>
        <h2>Title: {title}</h2>
        <div className="right-main-view-button-wrapper">
          {attachFileOrCreate}
          {buttonList}
          <button onClick={this._deleteCurrentFile.bind(this, currentNode)} className="submit-button delete-button">Delete Current</button>
        </div>
        {showWorking}
        <div className="right-main-view-properties">
          {propertiesList}
        </div>
        {fileOrFolderView}
      </div>
    );
  }

}

export default RightMainView;
