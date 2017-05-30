import 'nav/style.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export default ({ updateNavHover }) => {
  const linkHoverIn = {
    onMouseEnter: e => updateNavHover(e, true)
  };
  const navHoverOut = {
    onMouseLeave: e => updateNavHover(e, false)
  };
  return (
    <nav>
      <h1>Bogdan's Website</h1>
      <hr />
      <div className="links">
        <a className="github" href="www.github.com" {...hoverEvents}>
          <span className="icon" />
          <span className="icon-decoration" />
          <span className="label">GitHub</span>
        </a>
        <Link className="projects" to="projects" {...hoverEvents}>
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
        </Link>
        <Link className="contact" to="contact" {...hoverEvents}>
          <span className="icon" />
          <div className="icon-decoration layer-1" />
          <div className="icon-decoration layer-2">
            <div className="square-1" />
          </div>
          <span className="label">Contact</span>
        </Link>
      </div>
    </nav>
  );
};
