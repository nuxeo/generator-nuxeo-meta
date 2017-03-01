import React from 'react';

class EditDocument extends React.Component {
    constructor(props) {
        super(props);
        let document = this.props.fileTree.currentNode.item;
        this.state = {
            title: `${document.properties['dc:title']}`,
            description: `${document.properties['dc:description']}`
        };
    }

    _handleChange(field) {
        return (e) => {
            this.setState({[field]: e.target.value});
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
        let node = this.props.fileTree.currentNode;
        let doc = node.item;
        doc.properties['dc:title'] = this.state.title;
        doc.properties['dc:description'] = this.state.description;
        this.props.updateDocument(node);
    }

    render() {
        return (
            <div className="right-main-view-show-working-button">
                <h4>Edit {this.state.type}</h4>
                <form onSubmit={this._handleSubmit.bind(this)} className="create-document-form">
                    Title:
                    <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
                    Description:
                    <input type="text" onChange={this._handleChange("description")} value={this.state.description} />
                    <input className="create-document-button" type="submit" value="Update" />
                </form>
            </div>
        );
    }

}

module.exports = EditDocument;