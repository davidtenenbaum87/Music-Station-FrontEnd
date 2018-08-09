import {CHANGE_TITLE_FIELD} from './types.js';
import {CHANGE_COMPOSER_FIELD} from './types.js';


export function handleTitleChange(text) {
  return { type: CHANGE_TITLE_FIELD, payload: text }
}

export function handleComposerChange(text) {
  return { type: CHANGE_COMPOSER_FIELD, payload: text }
}
