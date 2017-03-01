import React from 'react';
import TreeActions from '../../../actions/tree_actions.js';

class ShowACL extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        TreeActions.getacl(this.props.fileTree.currentNode)(this.props.dispatch);
    }

    render() {
        let node = this.props.fileTree.currentNode;
        let aclList;
        if (node.acl) {
            aclList = node.acl.acl[0].ace.map((el, index) => {
                return (
                    <li key={index}>
                        {el.username} : {el.permission}
                    </li>
                )
            });
        }
        return (
            <div className="right-main-view-show-working-button">
                <ul>
                    {aclList}
                </ul>
            </div>
        )
    }
}

export default ShowACL