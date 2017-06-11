import './style.scss';
import { Route } from 'react-router-dom';
import Async from 'helpers/webpack';
import React from 'react';
import Nav from 'nav';

const Projects = props => (
  <Async load={System.import('projects')} componentProps={props} />
);
const Contact = props => (
  <Async load={System.import('contact')} componentProps={props} />
);

// import Contact from 'core/contact';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverEffectStyles: {},
      hoverEffectClass: '',
      navMinusTop: 0,
      viewClass: ''
    };

    this.updateNavHover = this.updateNavHover.bind(this);
  }

  // 1. Set correct view class
  // 2. Set correct minus top amount
  // 3. Attach global onResize listener
  componentDidMount() {
    this.setViewClass(this.props);
    this.navSpacing();
    window.addEventListener('resize', () => this.navSpacing());
  }

  componentWillReceiveProps(nextProps) {
    this.setViewClass(nextProps);
  }

  // Lets the app know whether to display
  // the intro view or the page view
  setViewClass({ location: { pathname } }) {
    this.setState({
      viewClass: pathname !== '/' ? 'page-view' : ''
    });
  }

  // Gets the px. value to correctly offset the nav
  // in the Y position so it sticks to the top,
  // hiding the space used by the title
  navSpacing() {
    const els = ['nav h1', 'nav h2', 'nav .spacing'];
    this.setState({
      navMinusTop: els
        .map(selector => document.querySelector(selector).offsetHeight)
        .reduce((a, b) => a + b, 0)
    });
  }

  // Updates the position and individual styles
  // of the navigation hover effect
  updateNavHover(e, mouseOnElement) {
    if (mouseOnElement) {
      const el = e.currentTarget;
      const hel = document.querySelector('.hover-effect');
      // Work out position and size of effect
      // -- find x offset of hovered icon from start of container
      // -- add icon width/2
      const left = el.offsetLeft + el.offsetWidth / 2 - hel.offsetWidth / 2;
      // -- add icon specific styles
      const hoverEffectClass = `style-${el.getAttribute('class')}`;
      // -- set hover effect styles
      this.setState({
        hoverEffectClass,
        hoverEffectStyles: {
          opacity: '1',
          left
        }
      });
    } else {
      // Hide hover effect
      this.setState({
        hoverEffectStyles: {
          ...this.state.hoverEffectStyles,
          opacity: '0'
        }
      });
    }
  }

  render() {
    const { updateNavHover } = this;
    const {
      hoverEffectStyles,
      hoverEffectClass,
      viewClass,
      navMinusTop,
      navLinksHeight
    } = this.state;
    const { match } = this.props;
    return (
      <div className={viewClass}>
        {/* 
          The position of this in the dom is important!!! If placed after the <nav> component, 
          boundingClientRect will work incorrectly and fetch some really strange 'top' values. 
        */}
        <Route path="/projects" component={Projects} />
        <Route path="/contact" component={Contact} />
        <Nav
          {...{
            updateNavHover,
            hoverEffectStyles,
            hoverEffectClass,
            ...(viewClass && { navMinusTop })
          }}
        />
      </div>
    );
  }
}

export default Main;
