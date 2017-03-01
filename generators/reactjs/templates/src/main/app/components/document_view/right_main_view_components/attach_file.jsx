import React from 'react';

const initialState = {
  title: "",
  description: "",
  type: "File",
  fileUrl: "",
  file: undefined
};

class AttachFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  _handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  _previewFile(e) {
  let file = e.currentTarget.files[0];
  let fileReader = new FileReader();
  fileReader.onloadend = () => {
    this.setState({ file: file, fileUrl: fileReader.result });
  };
  if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ fileUrl: "", file: undefined });
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    let currentNode = this.props.fileTree.currentNode;
    let callback = () => {
      this.setState(initialState);
    };
    this.props.attachFile(currentNode, this.state, callback);
  }

  render() {
    let submit = this._handleSubmit.bind(this);
    let preview = this._previewFile.bind(this);
    let embedded;
    if(this.state.file) {
      embedded = <embed src={this.state.fileUrl} type={this.state.file.type} className="upload-preview-embed"/>;
    }

    return (
      <div className="right-main-view-show-working-button">
        <h3>Attach File</h3>
        <form onSubmit={submit} className="attach-file-form">
          Title:
          <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
          Description:
          <input type="text" onChange={this._handleChange("description")} value={this.state.description} />
          <br></br>
          File:
          <input className="submit-button submit-button-upload" type="file" onChange={preview}/>
          <br></br>
          <input className="submit-button" type="submit" value="Attach File" />
          <div className="upload-preview">{embedded}</div>
        </form>
      </div>
    );
  }

}

module.exports = AttachFile;
