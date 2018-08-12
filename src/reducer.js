import { CHANGE_TITLE_FIELD } from './types.js';
import { CHANGE_COMPOSER_FIELD } from './types.js';
import { CHANGE_INSTRUMENTATION_FIELD } from './types.js';

import { UPLOAD_MUSIC_SCORE } from './types.js';
import { UPDATE_CURRENT_USER_SCORES } from './types.js';
import { REMOVE_SCORE_FROM_USER_SCORES } from './types.js';
import { VIEW_SCORE_TOGGLE } from './types.js';
import { CLICKED_SCORE } from './types.js';
import { SET_CURRENT_USER } from './types.js';
import { LOGOUT_CURRENT_USER } from './types.js';



const initialState = {
  title: "",
  composer: "",
  instrumentation: "",
  music_score: null,
  current_user_scores: [],
  viewOn: false,
  selectedScore: null,
  userId: "",
  username: "",
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TITLE_FIELD:
      return { ...state, title: action.payload };
    case CHANGE_COMPOSER_FIELD:
      return { ...state, composer: action.payload };
    case CHANGE_INSTRUMENTATION_FIELD:
      return { ...state, instrumentation: action.payload };
    case UPLOAD_MUSIC_SCORE:
      return { ...state, music_score: action.payload };
    case UPDATE_CURRENT_USER_SCORES:
      return { ...state, current_user_scores: action.payload }
    case REMOVE_SCORE_FROM_USER_SCORES:
      const updated_scores = state.current_user_scores.filter(score => {
        return score.id !== action.payload
      })
      return { ...state, current_user_scores: updated_scores }
    case VIEW_SCORE_TOGGLE:
      return { ...state, viewOn: !state.viewOn }
    case CLICKED_SCORE:
      return { ...state, selectedScore: action.payload };
    case SET_CURRENT_USER:
      return { ...state, userId: action.payload.userId, username: action.payload.username };
    case LOGOUT_CURRENT_USER:
      return { ...state, userId: "", username: "" };
    default:
      return state;
  }
}
