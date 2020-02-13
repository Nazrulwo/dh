// @flow
import React, { Component, Link } from 'react';
import Username from '../components/Username/Username';
import List from '../components/List/List';

class Home extends Component {

  render() {
    const { auth } = this.props
    var pageTitle = "Welcome, { auth.firstname }"
    return (
      <div className="dashboard">
        <Username />       
        <List />
      </div>      
    );
  }
}
export default Home;
