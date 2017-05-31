import 'nav/style.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export default ({ updateNavHover, hoverEffectStyles, hoverEffectClass }) => {
  const linkHoverIn = {
    onMouseEnter: e => updateNavHover(e, true),
    onMouseLeave: e => updateNavHover(e, false)
  };
  const navHoverOut = {};
  return (
    <nav>
      <h1>Bogdan Protsenko</h1>
      <h2>Front end developer based in London.</h2>
      <hr />
      <div className="links" {...navHoverOut}>
        <div
          className={`hover-effect ${hoverEffectClass}`}
          style={hoverEffectStyles}
        >
          <div />
          <div />
          <div />
          <div />
        </div>
        <a className="github" href="www.github.com" {...linkHoverIn}>
          <div className="inner">
            <span className="icon" />
            <span className="icon-decoration" />
            <span className="label">GitHub</span>
          </div>
        </a>
        <Link className="projects" to="projects" {...linkHoverIn}>
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
            <span className="label">Projects</span>
          </div>
        </Link>
        <Link className="contact" to="contact" {...linkHoverIn}>
          <div className="inner">
            <span className="icon" />
            <div className="icon-decoration layer-1" />
            <div className="icon-decoration layer-2">
              <div className="square-1" />
            </div>
            <span className="label">Contact</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
