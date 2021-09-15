import { csrfFetch } from "./csrf";

const SET_IMAGES = "reviews/setImages";


const setImages = (images) => ({
  type: SET_IMAGES,
  images,
});



export const getImages = () => async (dispatch) => {
  const res = await fetch("/api/images");
  const images = await res.json();
  dispatch(setImages(images));
};

const initialState = {};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES: {
      let newState = {};
      action.images.forEach((image) => (newState[image.id] = image));
      return newState;
    }
    default:
      return state;
  }
};

export default imageReducer;
