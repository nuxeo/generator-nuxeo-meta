import React from 'react';
import TreeActions from '../../../actions/tree_actions.js';

class ShowTask extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        TreeActions.gettask(this.props.fileTree.currentNode)(this.props.dispatch);
    }

    render() {
        let node = this.props.fileTree.currentNode;
        let string = JSON.stringify(node.task);
        return (
            <div className="right-main-view-show-working-button">
                {string}
            </div>
        )
    }
}

module.exports = ShowTask;