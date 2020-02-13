import {
    SAVE_USER,
} from '../actions/types'
 
let saveUser= {
    username:'',
    password:'',
    items: [
        [
          {id: Math.random(), type: 'component', value: 'Component1', x: 0, y: Infinity, w: 1, h: 2},
          {id: Math.random(), type: 'component', value: 'Component2', x: 1, y: Infinity, w: 1, h: 2},
          {id: Math.random(), type: 'component', value: 'Component3', x: 2, y: Infinity, w: 1, h: 2},
        ],
          ],
      tabs: [
        {id: Math.random(), name: 'Dashboard'},      
      ],  
};

export default (state = saveUser,action)=> {
    switch (action.type) {
        case SAVE_USER:
            Object.assign(state, action.data)
            break;
        default:
            break;
    }
    return state;
}