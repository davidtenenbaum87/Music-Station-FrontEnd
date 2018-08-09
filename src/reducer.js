import { CHANGE_TITLE_FIELD } from './types.js';
import { CHANGE_COMPOSER_FIELD } from './types.js';
import { UPLOAD_MUSIC_SCORE } from './types.js';




const initialState = {
  title: "",
  composer: "",
  music_score: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TITLE_FIELD:
      return { ...state, title: action.payload };
    case CHANGE_COMPOSER_FIELD:
      return { ... state, composer: action.payload };
    case UPLOAD_MUSIC_SCORE:
      return { ... state, music_score: action.payload };

    default:
      return state;
  }
}
