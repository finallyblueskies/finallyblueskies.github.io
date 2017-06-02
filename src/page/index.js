import 'page/style.scss';
import React from 'react';

export default ({ children }) => {
  return (
    <div className="container page">
      {children}
    </div>
  );
};
