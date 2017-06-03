import './style.scss';
import { Link } from 'react-router-dom';
import { Motion, spring, StaggeredMotion } from 'react-motion';
import { Route } from 'react-router-dom';
import React from 'react';
import Page from 'page';

const inView = el => {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

class Project extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { match: { params: { projectSlug } } } = this.props;
    const originEl = document.querySelector(`.${projectSlug}`);
    if (originEl && inView(originEl)) {
      //Animate project in from original project tile
      const rect = el.getBoundingClientRect();
      const boxStyleStart = { top: rect.top, left: rect.left };
      //TODO: make this actually get the image
      // const imageStyle = originEl.getAttribute('src');
      //Identify box width/height (w, h)
      //Identify box position relative to window (x, y)
      //Identify project image position and dimension (ix, iy) (iw, ih)
      //Generate background overlay at x, y  bgO (w, h)
      //Generate new image at x, y, nI (w, h)
      //Animate bgO from x, y -> x0, y0 (w100vw, h100vh)
      //Animate nI from  x, y -> ix, iy (iw, ih)
      //Animate project content in
      //Display none animation elements
      //Page ready
    } else {
      // ?? Think about this.
      // need to explore serverside rendering.
    }
  }
  render() {
    return <div className="project-container" />;
  }
}

export default Project;
