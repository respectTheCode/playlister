import { call, put } from 'redux-saga/effects';

import * as api from '../api/content';

export function* getContent(action) {
  try {
    console.log('saga getContent', action);
    const data = yield call(api.getContainerContent, action.path);
    yield put({ type: 'GET_CONTENT_SUCCESS', data });
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'GET_CONTENT_FAILURE', errorMessage: 'Could not find content' });
  }
}

export function* getMedia(action) {
  try {
    const data = yield call(api.getMedia, action.ids);
    yield put({ type: 'GET_MEDIA_SUCCESS', data });
  } catch (e) {
    console.error('Error getting media', e);
    yield put({ type: 'GET_MEDIA_FAILURE', errorMessage: 'Could not find media' });
  }
}

export function* addContainer(action) {
  try {
    const data = yield call(api.addContainer, action.parentId, action.name, action.fullPath, action.containerType);
    yield put({ type: 'ADD_CONTAINER_SUCCESS', data });
  } catch (e) {
    console.error('Error getting content', e);
    yield put({ type: 'ADD_CONTAINER_FAILURE', errorMessage: 'Could not add container' });
  }
}

