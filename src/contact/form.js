import './style.scss';
import React from 'react';
import Page from 'page';
import { Motion, StaggeredMotion } from 'react-motion';
import {
  applySpring,
  fadeInSpringParams,
  staggeredMotionStyles
} from 'helpers/motion';

export default () => {
  const formElements = [
    <div className="field">
      <label className="label" htmlFor="" />
      <p className="control">
        <input placeholder="your@email.com" type="text" className="input" />
      </p>
    </div>,
    <div className="field">
      <label className="label" htmlFor="" />
      <p className="control">
        <textarea placeholder="Your message..." className="textarea" />
      </p>
    </div>,
    <button className="send-message-button button is-primary">Send</button>
  ];
  return (
    <div className="contact-form-container">
      <StaggeredMotion
        defaultStyles={formElements.map(() => ({ opacity: 0, scale: 0.8 }))}
        styles={prevValues => staggeredMotionStyles(prevValues)}
      >
        {interpolatingStyles => (
          <div className="form-fields-container">
            {interpolatingStyles.map((style, i) => (
              <div
                key={i}
                style={{
                  opacity: style.opacity,
                  transform: `scale(${style.scale})`
                }}
              >
                {formElements[i]}
              </div>
            ))}
          </div>
        )}
      </StaggeredMotion>
    </div>
  );
};
