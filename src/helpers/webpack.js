import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'helpers/general';

export default class Async extends React.Component {
  componentWillMount() {
    this.props.load.then(c => {
      this.props.onLoad();
      this.C = c;
      this.forceUpdate();
    });
  }

  render() {
    const { componentProps } = this.props;
    return this.C ? <this.C.default {...componentProps} /> : null;
  }
}

Async.propTypes = {
  load: PropTypes.instanceOf(Promise).isRequired
};

Async.defaultProps = {
  load: PropTypes.instanceOf(Promise).isRequired,
  onLoad: noop
};
