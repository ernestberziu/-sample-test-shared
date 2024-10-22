import React from 'react';
import PropTypes from 'prop-types';

import './Row.css';

const Row = (props) => {
  const { children, className, noOffset } = props;
  const classNames = ['ta-row'];
  if (className) classNames.push(className);
  if (noOffset) classNames.push('ta-row__no-offset');

  return <div className={classNames.join(' ')}>{children}</div>;
};

Row.propTypes = {
  noOffset: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
};

Row.defaultProps = {
  noOffset: false,
  className: '',
  children: null,
};

export default Row;
