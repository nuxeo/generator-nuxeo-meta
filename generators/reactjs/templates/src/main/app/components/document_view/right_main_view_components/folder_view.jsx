import React from 'react';

class FolderView extends React.Component {
    constructor(props) {
        super(props);
    }

    _deleteFile(node, e){
        e.preventDefault();
        let callback = () => {
            this.props.setCurrentNode(this.props.fileTree.currentNode)
        };
        this.props.deleteDocument(node, callback);
    }

    _setWorkingFile(node, e){
        e.preventDefault();
        node.parent.showChildren = true;
        node.showChildren = true;
        this.props.setCurrentNode(node);
        this.props.fetchChildren(node);

    }

    render() {
        let node = this.props.fileTree.currentNode;
        let childNodes = node.children;
        let list = Object.keys(childNodes).map((id) => {
            return (
                <li key={id} className="file-view-list-item">
                    <button onClick={this._deleteFile.bind(this, childNodes[id])} className="submit-button delete-button">Delete</button>
                    <div onClick={this._setWorkingFile.bind(this, childNodes[id])}>
                        {childNodes[id].item.title}
                    </div>
                </li>
            );
        });

        return (
            <div className="file-view-wrapper">
                <h3>Sub-files & Folders</h3>
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}

module.exports = FolderView;
