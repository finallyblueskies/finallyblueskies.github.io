import { pick, mapObjIndexed } from 'ramda';
import { spring } from 'react-motion';

/**
 * Spring config and helpers
 */

export const fadeInSpringParams = {
  damping: 15,
  stiffness: 60
};

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

export const staggeredMotionStyles = prevValues =>
  prevValues.map((_, i) => {
    const prev = prevValues[i - 1];
    return i === 0
      ? applySpring({ opacity: 1, scale: 1 }, fadeInSpringParams)
      : applySpring(
          { opacity: prev.opacity, scale: prev.scale },
          fadeInSpringParams
        );
  });

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

export default {
  staggeredMotionStyles,
  fadeInSpringParams,
  originRect,
  applySpring,
  animOrigin,
  animWindow
};
