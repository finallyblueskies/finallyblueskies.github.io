import React from 'react';
import Nav from 'nav';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverEffectStyles: {},
      hoverEffectClass: ''
    };

    this.updateNavHover = this.updateNavHover.bind(this);
  }

  updateNavHover(e, mouseOnElement) {
    if (mouseOnElement) {
      const el = e.currentTarget;
      const hel = document.querySelector('.hover-effect');
      // Work out position and size of effect
      // -- find x offset of hovered icon from start of container
      const left = el.offsetLeft + el.offsetWidth / 2 - hel.offsetWidth / 2;
      // -- set hover effect width
      // -- add icon width/2
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
      // Set hover effect style width: 0
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
    const { hoverEffectStyles, hoverEffectClass } = this.state;
    return (
      <div>
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
