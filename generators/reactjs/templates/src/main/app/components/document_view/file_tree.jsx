import React from 'react';
import DocumentTypeConstants from '../../constants/document_type_constants';
import { FileTreeContainer } from './document_view_container';

class FileTree extends React.Component {
  constructor(props) {
    super(props);
  }

  _showChildren(e) {
    e.stopPropagation();
    let node = this.props.node;
    if (node.showChildren && node === this.props.fileTree.currentNode) {
      node.showChildren = false;
    } else {
      node.showChildren = true;
      this.props.fetchChildren(node);
      this.props.setCurrentNode(node);
    }
    this.forceUpdate();
  }

  render() {
    let currentNode = this.props.fileTree.currentNode;
    let node = this.props.node;
    let containers = DocumentTypeConstants.containers.concat(DocumentTypeConstants.defaultContainers);
    let subFiles;
    let showChildren;
    let highlightWorking;
    if (currentNode === node) {
      highlightWorking = 'highlight-working';
    }

    if (node.showChildren) {
      let keys = Object.keys(node.children);
      if (containers.includes(node.item.type)) {
        showChildren = 'show-children';
      }
      subFiles = keys.map((childId) => {
        return (
          <li key={childId}>
            <FileTreeContainer node={node.children[childId]} />
          </li>
        );
      });
    }

    let title;
    if (node.item.type === 'Root') {
      title = "Root";
    } else {
      title = node.item.title;
    }
    return (
      <div className={`file-tree-view`} >
           <div className="file-tree-title-wrapper" onClick={this._showChildren.bind(this)}>
             <div className={`${node.item.type} ${showChildren}`}></div>
             <div className={`file-tree-title ${highlightWorking}`} >
               {title}
             </div>
           </div>
        <ul>
          {subFiles}
        </ul>
      </div>
    );
  }
}

export default FileTree
