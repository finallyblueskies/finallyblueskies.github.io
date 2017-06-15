import './style.scss';
import React from 'react';
import { Motion } from 'react-motion';
import { Link } from 'react-router-dom';

export default ({
  navStyles,
  updateNavHover,
  hoverEffectStyles,
  hoverEffectClass,
  navMinusTop
}) => {
  const linkHoverIn = {
    onMouseEnter: e => updateNavHover(e, true),
    onMouseLeave: e => updateNavHover(e, false)
  };
  return (
    <Motion style={navStyles || {}}>
      {style => (
        <nav
          style={{
            top: style.top
          }}
        >
          <h1 style={{ opacity: style.opacity }}>Bogdan Protsenko</h1>
          <h2 style={{ opacity: style.opacity }}>
            Front end developer based in London.
          </h2>
          <div style={{ opacity: style.opacity }} className="spacing" />
          <div className="links">
            <div
              className={`hover-effect ${hoverEffectClass}`}
              style={hoverEffectStyles}
            >
              <div className="inner">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
            <a className="github" href="www.github.com" {...linkHoverIn}>
              <div className="inner">
                <span className="icon" />
                <span className="icon-decoration" />
                <span className="label">SOCIAL</span>
              </div>
            </a>
            <Link className="projects" to="/projects" {...linkHoverIn}>
              <div className="inner">
                <span className="icon" />
                <div className="icon-decoration layer-1">
                  <div className="square-2" />
                  <div className="square-3" />
                  <div className="square-4" />
                  <div className="square-5" />
                </div>
                <div className="icon-decoration layer-2" />
                <div className="icon-decoration layer-3">
                  <div className="square-1" />
                </div>
                <span className="label">WORK</span>
              </div>
            </Link>
            <Link className="contact" to="/contact" {...linkHoverIn}>
              <div className="inner">
                <span className="icon" />
                <div className="icon-decoration layer-1" />
                <div className="icon-decoration layer-2">
                  <div className="square-1" />
                </div>
                <span className="label">CONTACT</span>
              </div>
            </Link>
          </div>
        </nav>
      )}
    </Motion>
  );
};
