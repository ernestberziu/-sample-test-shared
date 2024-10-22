import React from 'react';
import PropTypes from 'prop-types';

import './Error.css';
import Alert from '../Alert/Alert';

const Error = ({ errors, hasTopOffset, hasHalfTopOffset }) => {
  if (errors.length < 1) return null;
  const classNames = ['ta-error'];
  if (hasTopOffset) classNames.push('ta-error__has-top-offset');
  if (hasHalfTopOffset) classNames.push('ta-error__has-half-top-offset');

  return (
    <div className={classNames.join(' ')}>
      <Alert theme="error" noOffset noBorder isCompact>
        {errors.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </Alert>
    </div>
  );
};

Error.propTypes = {
  hasTopOffset: PropTypes.bool,
  hasHalfTopOffset: PropTypes.bool,
  errors: PropTypes.array,
};

Error.defaultProps = {
  hasTopOffset: false,
  hasHalfTopOffset: false,
  errors: [],
};

export default Error;
