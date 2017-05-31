import React from 'react';
import Nav from 'nav';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverEffectStyles: {},
      hoverEffectClass: '',
      viewClass: ''
    };

    this.updateNavHover = this.updateNavHover.bind(this);
  }

  componentDidMount() {
    this.setViewClass(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setViewClass(nextProps);
  }

  setViewClass({ location: { pathname } }) {
    this.setState({
      viewClass: pathname !== '/' ? 'page-view' : ''
    });
  }

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
    const { hoverEffectStyles, hoverEffectClass, viewClass } = this.state;
    return (
      <div className={viewClass}>
        <Nav
          {...{
            updateNavHover,
            hoverEffectStyles,
            hoverEffectClass
          }}
        />
        {this.props.children}
        {/*<Footer />*/}
      </div>
    );
  }
}

export default Main;
