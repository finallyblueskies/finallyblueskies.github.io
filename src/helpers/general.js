import Async from 'helpers/webpack';

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

export default {
  inArray,
  addValidOnce,
  noop
};
