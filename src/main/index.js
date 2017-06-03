import './style.scss';
import { Route } from 'react-router-dom';
import React from 'react';
import Nav from 'nav';
import Projects from 'projects';

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
    return (
      <div className={viewClass}>
        <Nav
          {...{
            updateNavHover,
            hoverEffectStyles,
            hoverEffectClass,
            ...(viewClass && { navMinusTop })
          }}
        />
        {/*Properly position the page*/}
        <Route path="/projects" component={Projects} />
        {/*<Footer />*/}
      </div>
    );
  }
}

export default Main;
