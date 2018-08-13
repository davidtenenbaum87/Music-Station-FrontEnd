import {CHANGE_TITLE_FIELD} from './types.js';
import {CHANGE_COMPOSER_FIELD} from './types.js';
import {CHANGE_INSTRUMENTATION_FIELD} from './types.js';
import {UPLOAD_MUSIC_SCORE} from './types.js';
import {UPDATE_CURRENT_USER_SCORES} from './types.js';
import {REMOVE_SCORE_FROM_USER_SCORES} from './types.js';
import {VIEW_SCORE_TOGGLE} from './types.js';
import {CLICKED_SCORE} from './types.js';
import {SET_CURRENT_USER} from './types.js';
import {LOGOUT_CURRENT_USER} from './types.js';
import {SELECTED_DATE} from './types.js';
import {DISPLAY_EVENT_FORM} from './types.js';
import {HANDLE_EVENT_TITLE_CHANGE} from './types.js';
import {HANDLE_EVENT_DESCRIPTION_CHANGE} from './types.js';
import {HANDLE_EVENT_DATE_CHANGE} from './types.js';
import {HANDLE_EVENT_START_TIME_CHANGE} from './types.js';
import {HANDLE_EVENT_END_TIME_CHANGE} from './types.js';
import {GET_CURRENT_USER_EVENTS} from './types.js';



export function handleTitleChange(text) {
  return { type: CHANGE_TITLE_FIELD, payload: text }
}

export function handleComposerChange(text) {
  return { type: CHANGE_COMPOSER_FIELD, payload: text }
}

export function handleInstrumentationChange(text) {
  return { type: CHANGE_INSTRUMENTATION_FIELD, payload: text }
}

export function handleMusicScoreUpload(file) {
  return { type: UPLOAD_MUSIC_SCORE, payload: file }
}

export function updateCurrentUserScores(scores) {
  return { type: UPDATE_CURRENT_USER_SCORES, payload: scores }
}

export function removeScoreFromUserScores(scoreId) {
  return { type: REMOVE_SCORE_FROM_USER_SCORES, payload: scoreId }
}

export function toggleScoreDisplay() {
  return { type: VIEW_SCORE_TOGGLE }
}

export function selectedClickedScore(score) {
  return { type: CLICKED_SCORE, payload: score }
}

export function setCurrentUser(userId, username) {
  return { type: SET_CURRENT_USER, payload: {userId, username} }
}

export function logoutCurrentUser() {
  return { type: LOGOUT_CURRENT_USER }
}

export function selectedClickedDate(date) {
  return { type: SELECTED_DATE, payload: date }
}

export function displayEventForm() {
  return { type: DISPLAY_EVENT_FORM }
}

export function handleEventTitleChange(text) {
  return { type: HANDLE_EVENT_TITLE_CHANGE, payload: text }
}

export function handleEventDescriptionChange(text) {
  return { type: HANDLE_EVENT_DESCRIPTION_CHANGE, payload: text }
}

export function handleEventDateChange(date) {
  return { type: HANDLE_EVENT_DATE_CHANGE, payload: date }
}

export function handleEventStartTimeChange(text) {
  return { type: HANDLE_EVENT_START_TIME_CHANGE, payload: text }
}

export function handleEventEndTimeChange(text) {
  return { type: HANDLE_EVENT_END_TIME_CHANGE, payload: text }
}

export function getCurrentUserEvents(events) {
  return { type: GET_CURRENT_USER_EVENTS, payload: events }
}
