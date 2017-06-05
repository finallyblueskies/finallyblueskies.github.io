import './style.scss';
import { Link } from 'react-router-dom';
import { Motion, spring, StaggeredMotion } from 'react-motion';
import { Route } from 'react-router-dom';
import { equals, pick, mapObjIndexed, map, merge, prop, path } from 'ramda';
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

class ProjectAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      displayContent: false,
      instances: []
    };
    this.onRest = this.onRest.bind(this);
  }

  // componentDidMount(){
  //   this.animateAnimationState(this.props.match);
  // }

  componentWillReceiveProps(nextProps) {
    if (!equals(this.props.match, nextProps.match)) {
      this.animateAnimationState(nextProps.match);
    }
  }

  animateAnimationState(match) {
    if (match) {
      this.animateIn(match);
    } else {
      // Use the current props as the ones passed
      // will be nextProps.match (null)
      this.animateOut(this.props.match);
    }
  }

  //TODO: Test and find solution to having the project open
  //without the transition if the route is visited directly
  animateIn(match) {
    const { params: { projectSlug } } = match;
    const originEl = document.querySelector(`.${projectSlug}`);
    const imageEl = document.querySelector('.project-container .main-image');
    const style = window.getComputedStyle(originEl);
    const backgroundColor = style.getPropertyValue('background-color');
    //Animate project in from original project tile
    //TODO: make this actually get the image
    // const imageStyle = originEl.getAttribute('src');
    //Identify box position and dimensions (x, y) (w, h)
    const originRect = pick(
      ['top', 'left', 'width', 'height'],
      originEl.getBoundingClientRect()
    );
    //Identify project image position and dimension (ix, iy) (iw, ih)
    // const imageRect = imageEl.getBoundingClientRect();
    //Generate background overlay at x, y  bgO (w, h)
    //Generate new image at x, y, nI (w, h)
    this.updateAnimationInstance(
      projectSlug,
      {
        animating: true,
        display: true,
        originRect,
        animRect: originRect,
        backgroundColor
      },
      () =>
        this.updateAnimationInstance(projectSlug, {
          animRect: this.applySpring({
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          })
        })
    );
    //Animate bgO from x, y -> x0, y0 (w100vw, h100vh)
    //Animate nI from  x, y -> ix, iy (iw, ih)
    //Animate project content in
    //Display none animation elements
    //Page ready, release scrolling
  }

  animateOut(match) {
    const { params: { projectSlug } } = match;
    const { originRect } = path(['instances', projectSlug], this.state);
    const animRect = this.applySpring(originRect);
    //Apply spring value to originRect and animate back
    this.updateAnimationInstance(projectSlug, {
      animRect
    });
  }

  updateAnimationInstance(projectSlug, state, callback) {
    const { instances } = this.state;
    //TODO: pipe properly
    const instance = prop(projectSlug, instances);
    const newState = merge(instance, state);
    this.setState(
      {
        instances: {
          ...instances,
          ...{ [projectSlug]: newState }
        }
      },
      callback
    );
  }

  applySpring(rect) {
    return mapObjIndexed(x => spring(x), rect);
  }

  onRest(animatingSlug) {
    const { match } = this.props;
    const projectSlug = path(['params', 'projectSlug'], match);
    this.updateAnimationInstance(animatingSlug, {
      ...(!equals(projectSlug, animatingSlug) && { display: false }),
      animating: false
    });
  }

  render() {
    const { displayContent, instances } = this.state;
    const { match } = this.props;
    //Cycle through instances of animation
    const Animations = Object.keys(instances).map((projectSlug, i) => {
      //Extract instance state
      const { animRect, display, animating, backgroundColor } = instances[
        projectSlug
      ];
      return (
        display &&
        //Render motion
        <Motion
          key={i}
          style={animRect}
          onRest={() => this.onRest(projectSlug)}
        >
          {style => (
            <div style={{ ...style, backgroundColor }} className="background" />
          )}
        </Motion>
      );
    }, instances);
    return (
      <div className="project-animation-container">
        {/* Multiple animation instances so that concurrently running project animations don't
        mess with each other */}
        {Animations}
        {/* Fade this in once transition finished */}
        {displayContent && this.props.children}
      </div>
    );
  }
}

export default ProjectAnimation;
