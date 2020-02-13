import React, {Component, Suspense} from 'react';
import './i18n'
import Trans from './Trans'

export class Component1 extends Component {
  render() {
    return(
      <div className="boxContent">
      <Suspense fallback={null}>
        <h3><Trans word={'hello'}/></h3>
        <p><Trans word={'thankyou'} /></p>       
      </Suspense>
    </div>
    )
  }
}