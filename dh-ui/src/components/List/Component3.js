import React, {Component} from 'react';

export class Component3 extends Component {
  constructor(props){
    super(props);
    this.state = {
        posts:[]
    };
}
componentWillMount(){
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => this.setState({ posts: data}));
}
  render() {
    const postItems = this.state.posts.map(post => (
      <div key = {post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
      </div>
  ));
    return(
      <div> 
          <h3>Posts</h3>
          {postItems}
      </div>
    )
  }
}