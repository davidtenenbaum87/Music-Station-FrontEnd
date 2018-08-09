import { CHANGE_TITLE_FIELD } from './types.js';
import { CHANGE_COMPOSER_FIELD } from './types.js';
import { UPLOAD_MUSIC_SCORE } from './types.js';
import { UPDATE_CURRENT_USER_SCORES } from './types.js';
import { REMOVE_SCORE_FROM_USER_SCORES } from './types.js';

const initialState = {
  title: "",
  composer: "",
  music_score: null,
  current_user_scores: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TITLE_FIELD:
      return { ...state, title: action.payload };
    case CHANGE_COMPOSER_FIELD:
      return { ...state, composer: action.payload };
    case UPLOAD_MUSIC_SCORE:
      return { ...state, music_score: action.payload };
    case UPDATE_CURRENT_USER_SCORES:
      return { ...state, current_user_scores: action.payload }
    case REMOVE_SCORE_FROM_USER_SCORES:
      const updated_scores = state.current_user_scores.filter(score => {
        return score.id !== action.payload
      })
      return { ...state, current_user_scores: updated_scores }
    default:
      return state;
  }
}
