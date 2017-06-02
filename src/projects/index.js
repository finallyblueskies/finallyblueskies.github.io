import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Page from 'page';
import { Motion, spring, StaggeredMotion } from 'react-motion';

// Temp

const squares = [];
let count = 10;
while (count--) {
  squares.push({
    title: `square-${count}`
  });
}
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// end temp

const animStyles = vals => {
  return {
    opacity: vals.opacity,
    transform: `scale(${vals.scale}) translate3d(0,0,0)`
  };
};

export default () => {
  return (
    <Page>
      <div className="projects-container">
        <StaggeredMotion
          defaultStyles={squares.map(() => ({ opacity: 0, scale: 0.8 }))}
          styles={prevValues =>
            prevValues.map((_, i) => {
              const prev = prevValues[i - 1];
              return i === 0
                ? { opacity: spring(1), scale: spring(1) }
                : { opacity: spring(prev.opacity), scale: spring(prev.scale) };
            })}
        >

          {interpolatingStyles => (
            <div>
              {interpolatingStyles.map((styleValues, i) => (
                <div className="item" key={i} style={animStyles(styleValues)} />
              ))}
            </div>
          )}

        </StaggeredMotion>
      </div>
    </Page>
  );
};
