import {CHANGE_TITLE_FIELD} from './types.js';
import {CHANGE_COMPOSER_FIELD} from './types.js';
import {UPLOAD_MUSIC_SCORE} from './types.js';
import {UPDATE_CURRENT_USER_SCORES} from './types.js';
import {REMOVE_SCORE_FROM_USER_SCORES} from './types.js';

export function handleTitleChange(text) {
  return { type: CHANGE_TITLE_FIELD, payload: text }
}

export function handleComposerChange(text) {
  return { type: CHANGE_COMPOSER_FIELD, payload: text }
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
