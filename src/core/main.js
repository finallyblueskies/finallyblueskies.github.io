import React from 'react';
import Nav from 'nav';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  updateNavHover(e, mouseOnElement) {
    if (mouseOnElement) {
      const el = e.currentTarget;
      // Work out position and size of effect
      // -- find x offset of hovered icon from start of container
      // -- add icon width/2
      // -- set hover effect width
      // -- set hover effect x position
      // -- set hover effect styles
      // -- if hover effect was visible, set travelling transition
    } else {
      // Set hover effect style width: 0
      // on animation finish
    }
  }

  render() {
    const { updateNavHover } = this;
    return (
      <div>
        <Nav {...{ updateNavHover }} />
        {this.props.children}
        {/*<Footer />*/}
      </div>
    );
  }
}

export default Main;
