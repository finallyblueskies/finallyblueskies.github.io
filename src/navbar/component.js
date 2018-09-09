import React, { Component } from 'react';
import "./styles.css";
import { LINK } from "../constants";

class MainComponent extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <a className="button is-primary" href={LINK.GITHUB}>
              <span className="icon">
                <i className="fab fa-github"></i>
              </span>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainComponent;
