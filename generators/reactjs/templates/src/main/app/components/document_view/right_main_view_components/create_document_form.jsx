import React from 'react';
import { createDocument } from '../../../actions/tree_actions.js';
import DocumentTypeConstants from '../../../constants/document_type_constants';

const containers = DocumentTypeConstants.containers;
const documents = DocumentTypeConstants.documents;

class CreateDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            type: "Workspace",
            activeType: "Workspace"
        };
    }

    _handleChange(field) {
        return (e) => {
            this.setState({[field]: e.target.value});
        };
    }

    _changeDocumentType(type, e) {
        this.setState({type: type});
    }

    _handleSubmit(e) {
        e.preventDefault();
        let doc = {
            'entity-type': 'document',
            name: `${this.state.title}`,
            type: `${this.state.type}`,
            properties: {
                'dc:title': `${this.state.title}`,
                'dc:description': `${this.state.description}`
            },
        };
        let parentNode = this.props.fileTree.currentNode;
        let callback = () => {
            this.setState({title: "", description: ""});
        };
        this.props.createDocument(parentNode, doc, callback);
    }

    render() {
        let createCollaborativeWorkspaces = containers.map((type) => {
            return (
                <button className="create-document-button" key={type} onClick={this._changeDocumentType.bind(this, type)}>{type}</button>
            );
        });

        let createDocuments = documents.map((type) => {
            return (
                <button className="create-document-button" key={type} onClick={this._changeDocumentType.bind(this, type)}>{type}</button>
            );
        });

        return (
            <div className="right-main-view-show-working-button">
                <div className="create-document-button-wrapper">
                    <div className="create-document-button-divider">
                        <h4>Collaborative Spaces</h4>
                        {createCollaborativeWorkspaces}
                    </div>
                    <div className="create-document-button-divider">
                        <h4>Documents</h4>
                        {createDocuments}
                    </div>
                </div>

                <h4>Create {this.state.type}</h4>
                <form onSubmit={this._handleSubmit.bind(this)} className="create-document-form">
                    Title:
                    <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
                    Description:
                    <input type="text" onChange={this._handleChange("description")} value={this.state.description} />
                    <input className="create-document-button" type="submit" value="Create Document" />
                </form>
            </div>
        );
    }

}

module.exports = CreateDocument;