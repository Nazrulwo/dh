import React, {Component} from 'react';

export class Component5 extends Component {
  render() {
    return(
      <div>
         <h3>Simulering</h3>
          <form className="formArea">
            <ul>
              <li><label>Trafikplats</label>
              <input type="text" /></li>
              <li><label>Rättidighet</label>
              <input type="text" /></li>
              <li><label>Klockslag</label>
              <input type="text" /></li>
              <li><label>Annat tåg</label>
              <input type="text" /></li>                                          
            </ul>
            <input type="submit" value="Starta simulering" />
          </form>
      </div>
    )
  }
}