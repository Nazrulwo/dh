// @flow
import React, { Component, Link } from 'react';
import Trans from '../List/Trans';


class Username extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: null,
      userId: "",
      title: "",
      body: "",
      username: "admin",
      //username: localStorage.getItem("user_name"),
    };
  }
  changeName = () => {
    this.setState({username: "Role 1"});
  }
  render() {
    return (
          <div className="profileName">
              <div className="pro">{this.state.username}
                <ul>
                  <li className="role1"><a href="/RoleOne" onClick={this.changeName}><Trans word={'role1'} /><small>(<Trans word={'default'} />)</small></a></li>
                  <li className="role2"><a href="/RoleTwo"><Trans word={'role2'} /></a></li>
                  <li className="role3"><a href="/RoleThree"><Trans word={'role3'} /></a></li>
                  <li className="logout"><a href="/"><Trans word={'logout'} /></a></li>
                </ul>
              </div>         
          </div>          
    );
  }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
 
  handleEditClick = (content) => {
    this.setState({
      modal: true,
      id: content.id,
      userId: content.userId,
      title: content.title,
      body: content.body,
    });
  }
  handleCancel = () => {
    this.setState({
      modal:false,
    })
  }

  handleDeleteClick = (content) => {
    this.props.deleteContent(content.id, this.props.contents);
  }

  handleNew = () => {
    this.setState({
      modal: true,
      id: null,
      userId: "",
      title: "",
      body: "",
    });
  }
  handleSingout = () => {
    const clsname=document.body.classList.value;
    console.log(clsname);
    this.props.signOutUser();
  }

handleSave = () => {
  this.setState({
    modal: false,
  });
  if (this.state.id !== null) {
      this.props.editContent({
        id: this.state.id,
        userId: this.state.userId,
        title: this.state.title,
        body: this.state.body,
      }, this.props.contents);
    } else {
      this.props.addContent({
        userId: this.state.userId,
        title: this.state.title,
        body: this.state.body,
      }, this.props.contents);
    }
  }
}
export default Username;