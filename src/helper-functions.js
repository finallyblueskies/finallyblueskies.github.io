import { mapObjIndexed, pipe, pick } from 'ramda';
import { spring } from 'react-motion';

/**
 * Updates an object's values through
 * react-motion's `spring()` function
 */
export const applySpring = (obj, config) =>
  mapObjIndexed(
    x =>
      spring(
        x,
        config || {
          damping: 15,
          stiffness: 70,
          precision: 20
        }
      ),
    obj
  );

/**
 * Returns the boundingClientRect of
 * an element
 */
export const originRect = slug => {
  const el = document.querySelector(`.${slug}`);
  return el
    ? pick(['top', 'left', 'width', 'height'], el.getBoundingClientRect())
    : null;
};

/**
 * Returns an object to animate an element
 * to its origin 
 */
export const animOrigin = (slug, config) =>
  applySpring(originRect(slug), config);

/**
 * Returns an object to animate an element
 * to the size of the window
 */
export const animWindow = config =>
  applySpring(
    {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    config
  );

export const addValidOnce = (val, arr) =>
  val && !inArray(val, arr) ? [...arr, val] : arr;

export const inArray = (val, arr) => arr.indexOf(val) > -1;

export default {
  applySpring,
  animOrigin,
  animWindow,
  originRect,
  addValidOnce
};
