import {
  ADD_CONTENT,
  ADD_CONTENT_FAILED,
  EDIT_CONTENT,
  EDIT_CONTENT_FAILED,
  DELETE_CONTENT,
  DELETE_CONTENT_FAILED,
  LOAD_CONTENTS,
  LOAD_CONTENTS_FAILED,
} from '../actions/types'

  
const INITIAL_STATE = {
  contents: [],
  error: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CONTENT:
    {
      const newId = state.contents.length ? state.contents[state.contents.length - 1].id + 1 : 0;
      const newContents = [...state.contents, {...action.payload, id: newId}];
      return { ...state, contents: newContents, error: '' }
    } 
  case ADD_CONTENT_FAILED:
    return { ...state, error: action.payload }
  case EDIT_CONTENT:
    {
      const newContents = state.contents.map(content => content.id === action.payload.id ? action.payload : content);
      return { ...state, contents: [...newContents], error: '' }
    }
  case EDIT_CONTENT_FAILED:
    return { ...state, error: action.payload }
  case DELETE_CONTENT:
    {
      let id = 0;
      const newContents = state.contents.filter(content => content.id !== action.payload).map(content => {
        return {...content, id: id++}
      });
      return { ...state, contents: newContents, error: '' }
    }
  case DELETE_CONTENT_FAILED:
    return { ...state, error: action.payload }
  case LOAD_CONTENTS:
    return { ...state, contents: action.payload, error: '' }
  case LOAD_CONTENTS_FAILED:
    return { ...state, error: action.payload }
  default:
    return state
  }
}
