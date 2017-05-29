import React from 'react';
import { Link } from 'react-router';

export default () => (
  <nav>
    <h1>Bogdan's Website</h1>
    <hr />
    <div className="links">
      <a className="github" href="www.github.com">
        <span className="icon" />
        <span className="label">GitHub</span>
      </a>
      <Link className="projects" to="projects">
        <span className="icon" />
        <span className="label">Projects</span>
      </Link>
      <Link className="contact" to="contact">
        <span className="icon" />
        <span className="label">Contact</span>
      </Link>
    </div>
  </nav>
);
