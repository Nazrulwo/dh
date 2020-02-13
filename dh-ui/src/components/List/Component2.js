import React, { Component, Suspense } from 'react';
import './i18n'
import Trans from './Trans'

export class Component2 extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={null}>
          <Trans word={'thankyou'} />
        </Suspense>
      </div>
    )
  }
}
