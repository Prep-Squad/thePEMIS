import axios from 'axios'


const UPLOAD_MEME = 'UPLOAD_MEME'
const SET_MEME_URL = 'SET_MEME_URL'
const GET_MEMES = 'GET_MEMES'

export function uploadMeme (meme) {
  return {
    type: UPLOAD_MEME,
    meme
  }
}

export function setMemeUrl(url) {
  return { type: SET_MEME_URL, url }
}

export const getMemes = (memes) =>{
  return {
    type: GET_MEMES,
    memes
  }
}


const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

export const uploadMemeThunk = (data, props, userId) => {
  return async (dispatch) => {
    try {
    console.log('data: ', data)
     const {info} = await axios.post(`/api/memes/${userId}/add`, data, config)
      console.log('info: ', info)
      dispatch(uploadMeme(info));
      props.history.push('/')
    } catch (error) {
      console.log(error)
      console.error('error in the uploadMemeThunk');
    }
  };
};

export const getMemesThunk = (userId) =>{
   return async (dispatch) => {
  try {
    console.log('ALLO POPPET IMA THUNK')
    const { data } = await axios.get(`/api/memes/${userId}/library`)
    return dispatch(getMemes(data))
  } catch (error) {
    console.log(error)
    console.error('error in the getMemes thunk')
  }
   }
}

export const InitialState = {
  msg: '',
  type: '',
  memeUrl: '',
  memes: []
}

export function imageReducer (state = InitialState, action) {
  switch (action.type) {
    case SET_MEME_URL:
      return {
        ...state,
        ...{ setMemeUrl: action.url }
      }
    case GET_MEMES:
    console.log('action.memes: ', action.memes)
    return action.memes

    default:
      return state
  }
}
