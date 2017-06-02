import './style.scss';
import React from 'react';

export default ({ children }) => {
  return (
    <div className="page">
      <div className="container">
        {children}
      </div>
    </div>
  );
};
