import './style.scss';
import React from 'react';
import Page from 'page';
import { Motion, StaggeredMotion } from 'react-motion';
import {
  applySpring,
  fadeInSpringParams,
  staggeredMotionStyles
} from 'helpers/motion';
export default ({
  updateValue,
  onSubmit,
  submitting,
  message,
  email,
  errors,
  sent
}) => {
  const formElements = [
    <div className="field has-text-centered">
      <p className="description">
        You can get in touch with me on
        {' '}
        <b>mail@bogdans.website</b>
        , on any of my social networks or by using the form below.
      </p>
    </div>,
    <div className="field">
      <label className="label" htmlFor="" />
      <p className="control">
        <input
          name="email"
          value={email}
          onChange={updateValue}
          placeholder="your@email.com"
          type="text"
          className={`input ${errors.email ? 'is-danger' : ''}`}
        />
      </p>
      {errors.email && <p className="help is-danger">{errors.email}</p>}
    </div>,
    <div className="field">
      <label className="label" htmlFor="" />
      <p className="control">
        <textarea
          name="message"
          defaultValue={message}
          onChange={updateValue}
          placeholder="Your message..."
          className={`textarea ${errors.message ? 'is-danger' : ''}`}
        />
      </p>
      {errors.message && <p className="help is-danger">{errors.message}</p>}
    </div>,
    //Avoiding using button type="submit" because the styling there is messed up
    <div className="has-text-centered">
      <div
        className={`send-message-button button is-primary ${submitting ? 'is-loading' : ''} ${sent ? 'is-sent' : ''}`}
        onClick={onSubmit}
      >
        <span className="success-overlay" />
        <span className="tick" />
        Send
      </div>
    </div>
  ];

  return (
    <div className="contact-form-container">
      <form>
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
      </form>
    </div>
  );
};
