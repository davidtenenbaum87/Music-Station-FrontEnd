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
import { SELECTED_DATE } from './types.js';
import { DISPLAY_EVENT_FORM } from './types.js';
import { HANDLE_EVENT_TITLE_CHANGE } from './types.js';
import { HANDLE_EVENT_DESCRIPTION_CHANGE } from './types.js';
import { HANDLE_EVENT_DATE_CHANGE } from './types.js';
import { HANDLE_EVENT_START_TIME_CHANGE } from './types.js';
import { HANDLE_EVENT_END_TIME_CHANGE } from './types.js';
import { GET_CURRENT_USER_EVENTS } from './types.js';
import { REMOVE_EVENT_FROM_USER_EVENTS } from './types.js';
import { CHANGE_COMMENT_MEASURE_FIELD } from './types.js';
import { CHANGE_COMMENT_DESCRIPTION_FIELD } from './types.js';


const initialState = {
  title: "",
  composer: "",
  instrumentation: "",
  music_score: null,
  userId: "",
  username: "",
  current_user_scores: [],
  viewOn: false,
  selectedScore: null,
  selectedDate: new Date(),
  eventFormOn: false,
  event_title: "",
  event_description: "",
  event_date: null,
  event_start_time: "",
  event_end_time: "",
  current_user_events: [],
  comment_measure: "",
  comment_description: "",
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
      return {
        ...state,
        title: "",
        composer: "",
        instrumentation: "",
        music_score: null,
        userId: "",
        username: "",
        current_user_scores: [],
        viewOn: false,
        selectedScore: null,
        selectedDate: null,
        eventFormOn: false,
        event_title: "",
        event_description: "",
        event_date: "",
        event_start_time: "",
        event_end_time: "",
        current_user_events: null,
      };
    case SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    case DISPLAY_EVENT_FORM:
      return { ...state, eventFormOn: !state.eventFormOn };
    case HANDLE_EVENT_TITLE_CHANGE:
      return { ...state, event_title: action.payload };
    case HANDLE_EVENT_DESCRIPTION_CHANGE:
      return { ...state, event_description: action.payload };
    case HANDLE_EVENT_DATE_CHANGE:
      return { ...state, event_date: action.payload };
    case HANDLE_EVENT_START_TIME_CHANGE:
      return { ...state, event_start_time: action.payload };
    case HANDLE_EVENT_END_TIME_CHANGE:
      return { ...state, event_end_time: action.payload };
    case GET_CURRENT_USER_EVENTS:
      return { ...state, current_user_events: action.payload };
    case REMOVE_EVENT_FROM_USER_EVENTS:
      const updated_events = state.current_user_events.filter(user_event => {
        return user_event.id !== action.payload
      })
      return { ...state, current_user_events: updated_events };
    case CHANGE_COMMENT_MEASURE_FIELD:
      return { ...state, comment_measure: action.payload };
    case CHANGE_COMMENT_DESCRIPTION_FIELD:
      return { ...state, comment_description: action.payload };
    default:
      return state;
  }
}
