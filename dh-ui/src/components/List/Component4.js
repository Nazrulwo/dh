import React, {Component} from 'react';

export class Component4 extends Component {
  render() {
    return(
      <div>
         <h3>Form</h3>
          <form className="formArea">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone" />
            <input type="text" placeholder="Address 1" />
            <input type="text" placeholder="Address 2" />
            <input type="text" placeholder="Post Code" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Country" />
            <input type="text" placeholder="Comment" />
            <input type="submit" />
          </form>
      </div>
    )
  }
}
