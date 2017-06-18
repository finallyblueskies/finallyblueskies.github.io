import './style.scss';
import React from 'react';
import Page from 'page';

export default ({
  showProjectContent = true,
  project: { color, title, description, links }
}) => (
  <div
    className={`project-container ${showProjectContent ? 'show' : ''}`}
    style={{ color }}
  >
    <Page>
      <h1>{title}</h1>
      <div className="description">
        {description}
      </div>
      <div className="links has-text-centered">
        {links.map((link, i) => (
          <a
            key={i}
            className="button is-primary project-link"
            href={link.href}
          >
            {link.text}
          </a>
        ))}
      </div>
    </Page>
  </div>
);
