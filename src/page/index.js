import './style.scss';
import React from 'react';

export default ({ children, noPadding = false }) => {
  return (
    <div
      className="page"
      {...noPadding && { style: { paddingLeft: 0, paddingRight: 0 } }}
    >
      <div className="container">
        {children}
      </div>
    </div>
  );
};
