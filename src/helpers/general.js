import Async from 'helpers/webpack';
import { mergeWith, path, is } from 'ramda';

/**
 * Check whether value is in array
 */
export const inArray = (val, arr) => arr.indexOf(val) > -1;

/**
 * Adds a non null value to an array once
 */
export const addValidOnce = (val, arr) =>
  val && !inArray(val, arr) ? [...arr, val] : arr;

/**
 * Noop
 */
export const noop = () => {};

/**
 * Deep merge object
 */
export const deepMerge = (a, b) =>
  is(Object, a) && is(Object, b) ? mergeWith(deepMerge, a, b) : b;

/**
 * Ratchet global state management
 */
export const getGlobalState = pathArr => path(pathArr, window.APP_STATE);

export const setGlobalState = state => {
  window.APP_STATE = deepMerge(window.APP_STATE, state);
};

export default {
  inArray,
  addValidOnce,
  noop,
  getGlobalState,
  setGlobalState
};
