import React, { Component } from 'react';
import Nav from "../navbar/component";
import "./styles.css";

class MainComponent extends Component {
  render() {
    return (
      <div className="main-component-container">
        <div className="hello-world-outer">
          <section className="hero">
            <div className="hero-body">
              <div className="container">
                <div className="hello-world-inner">
                  <h1>
                    <span role="img" aria-label="Hello">👋</span>
                    <span role="img" aria-label="World!">🌍</span>
                  </h1>
                  <hr />
                  <h2 className="subtitle">
                    My name is Bogdan Protsenko. I'm a front end developer working <a href="https://about.grabyo.com/">@Grabyo</a>
                  </h2>
                  <Nav />
                </div>
              </div>
            </div>  
          </section>
        </div>
      </div>
    );
  }
}

export default MainComponent;
