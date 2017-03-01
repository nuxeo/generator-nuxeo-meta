import React from 'react';
import TreeActions from '../../../actions/tree_actions.js';

class ShowWorkFlow extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        TreeActions.getworkflow(this.props.fileTree.currentNode)(this.props.dispatch);
    }

    render() {
        let node = this.props.fileTree.currentNode;
        let string = JSON.stringify(node.workflow);
        return (
            <div className="right-main-view-show-working-button">
                {string}
            </div>
        )
    }
}

module.exports = ShowWorkFlow;