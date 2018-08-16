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
import {REMOVE_EVENT_FROM_USER_EVENTS} from './types.js';
import {CHANGE_COMMENT_MEASURE_FIELD} from './types.js';
import {CHANGE_COMMENT_DESCRIPTION_FIELD} from './types.js';
import {GET_SCORE_COMMENTS} from './types.js';
import {VIEW_VIDEOS_TOGGLE} from './types.js';
import {VIEW_COMMENTS_TOGGLE} from './types.js';
import {MUSIC_UPLOAD_FORM_TOGGLE} from './types.js';
import {CLEAR_COMMENT_FORM_FIELDS} from './types.js';
import {REMOVE_COMMENT_FROM_USER_COMMENTS} from './types.js';
import {ADD_NEW_COMMENT_TO_SCORE} from './types.js';
import {ADD_NEW_MUSIC_SCORE} from './types.js';
import {ADD_NEW_EVENT} from './types.js';


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

export function removeCommentFromUserComments(commentId) {
  return { type: REMOVE_COMMENT_FROM_USER_COMMENTS, payload: commentId }
}

export function toggleMusicFormDisplay() {
  return { type: MUSIC_UPLOAD_FORM_TOGGLE }
}

export function toggleScoreDisplay() {
  return { type: VIEW_SCORE_TOGGLE }
}

export function toggleVideosDisplay() {
  return { type: VIEW_VIDEOS_TOGGLE }
}

export function toggleCommentsDisplay() {
  return { type: VIEW_COMMENTS_TOGGLE }
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

export function removeEventFromUserEvents(eventId) {
  return { type: REMOVE_EVENT_FROM_USER_EVENTS, payload: eventId }
}

export function handleCommentMeasureChange(text) {
  return { type: CHANGE_COMMENT_MEASURE_FIELD, payload: text }
}

export function handleCommentDescriptionChange(text) {
  return { type: CHANGE_COMMENT_DESCRIPTION_FIELD, payload: text }
}

export function getCurrentScoreComments(comments) {
  return { type: GET_SCORE_COMMENTS, payload: comments }
}

export function clearCommentsFormFields() {
  return { type: CLEAR_COMMENT_FORM_FIELDS }
}

export function addNewCommentToScore(comment) {
  return { type: ADD_NEW_COMMENT_TO_SCORE, payload: comment }
}


export function fetchGetScoreComments(score_id) {
  return (dispatch) => {

    return fetch("http://localhost:3000/api/v1/comments")
    .then(res => res.json())
    .then(comments => {
      return comments.filter(comment => {
        return comment.score_id === score_id
      })
    })
    .then(comments => dispatch(getCurrentScoreComments(comments)))
  }
}

export function fetchPostScoreComments(comment_measure, comment_description, score_id) {
    return (dispatch) => {
      return fetch("http://localhost:3000/api/v1/comments", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ measure: comment_measure, description: comment_description, score_id: score_id })
      })
        .then(res => {
            if (!res.ok) {
              throw new Error("Bad Post")
            } else {
              return res;
            }
        })
        .then(res => res.json())
        .then(json => dispatch(addNewCommentToScore(json.comment)))
  }
}

export function addNewMusicScore(score) {
  return { type: ADD_NEW_MUSIC_SCORE, payload: score }
}

export function fetchGetMusicScores(userId) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/v1/users/${userId}`)
    .then(res => res.json())
    .then(user => dispatch(updateCurrentUserScores(user.scores)))
  }
}

export function fetchPostMusicScore(score) {
    return (dispatch) => {
      return fetch("http://localhost:3000/api/v1/scores", {
        method: 'POST',
        body: score
      })
      .then(res => {if (res.ok) { return res.json()}})
      .then(json => dispatch(addNewMusicScore(json.score)))
  }
}

export function addNewEvent(new_event) {
  return { type: ADD_NEW_EVENT, payload: new_event }
}

export function fetchPostEvent(new_event) {
  return (dispatch) => {
    fetch("http://localhost:3000/api/v1/events", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(new_event)
    })
    .then(res => {if (res.ok) { return res.json()}})
    .then(new_event => dispatch(addNewEvent(new_event)))

  }
}
