import React from 'react';
import { Motion, spring } from 'react-motion';
import { Route, Link } from 'react-router-dom';
import { merge, find, isEmpty } from 'ramda';
import { applySpring } from 'helpers/motion';

export default ({
  style: { scale, opacity },
  backgroundColor,
  animatingProject,
  projectStyles,
  onRest,
  active
}) => {
  const linkStyles = {
    opacity,
    transform: `scale(${scale}) translate3d(0,0,0)`
  };
  return (
    <div>
      <Motion style={projectStyles} onRest={onRest}>
        {style => (
          <div
            style={{
              backgroundColor,
              ...(animatingProject && { position: 'fixed', zIndex: 5 }),
              ...(active && { zIndex: 10 }),
              ...(!active && linkStyles),
              ...style
            }}
            className="project-item-animation"
          />
        )}
      </Motion>
    </div>
  );
};
