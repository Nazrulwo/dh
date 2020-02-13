import {
  ADD_CONTENT,
  ADD_CONTENT_FAILED,
  EDIT_CONTENT,
  EDIT_CONTENT_FAILED,
  DELETE_CONTENT,
  DELETE_CONTENT_FAILED,
  LOAD_CONTENTS,
  LOAD_CONTENTS_FAILED,
} from './types'

export const addContentAction = (newContent, contents) => {
  const content = contents.filter(content => newContent.id === content.id)[0];
  if (!content) {
    return {
      type: ADD_CONTENT,
      payload: newContent,
    }
  } else {
    return {
      type: ADD_CONTENT_FAILED,
      payload: "Text exist",
    }
  }
}

export const deleteContentAction = (id, contents) => {
  const content = contents.filter(content => content.id === id)[0];
  if (content) {
    return {
      type: DELETE_CONTENT,
      payload: id,
    }
  } else {
    return {
      type: DELETE_CONTENT_FAILED,
      payload: "not exist",
    }
  }
}

export const editContentAction = (updatedContent, contents) => {
  const content = contents.filter(content => content.id === updatedContent.id)[0];
  if (content) {
    return {
      type: EDIT_CONTENT,
      payload: updatedContent,
    }
  } else {
    return {
      type: EDIT_CONTENT_FAILED,
      payload: "Text exist",
    }
  }
}

export const loadContentsAction = (contents) => {
  if (contents.length) {
    return {
      type: LOAD_CONTENTS_FAILED,
      payload: "already loaded",
    };
  } else {
    return (dispatch) => {
      fetch('http://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then((data) => {
        dispatch ({
          type: LOAD_CONTENTS,
          payload: data,
        });
      })
      .catch(() => {
        dispatch ({
          type: LOAD_CONTENTS_FAILED,
          payload: "load failed",
        });
      })
    }
  }
}
