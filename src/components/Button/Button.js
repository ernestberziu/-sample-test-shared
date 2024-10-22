import React from 'react';
// import FontAwesome5 from '@timify/react-font-awesome5'
import PropTypes from 'prop-types';

import './Button.scss';

const TYPES = {
  isPrimary: 'ta-btn-primary',
  isSecondary: 'ta-btn-secondary',
  isTertiary: 'ta-btn-tertiary',
  isGhost: 'ta-btn-ghost',
  isBlock: 'ta-btn-block',
  isBlank: 'ta-btn-blank',
  rounded: 'ta-btn-rounded',
  disabled: 'ta-btn-disabled',
};

const HTML_LEAK_KEYS = [
  'isPrimary',
  'isSecondary',
  'isTertiary',
  'isGhost',
  'isBlock',
  'isBlank',
  'rounded',
];

const preventHTMLKeyLeak = (data, keys) => {
  const res = { ...data };
  for (const key of HTML_LEAK_KEYS) {
    delete res[key];
  }
  return res;
};

const SIZES = {
  s: 'ta-btn-sm',
  m: 'ta-btn-md',
  l: '',
  xl: 'ta-btn-xl',
};

const BORDER_SIZES = {
  s: 'ta-btn-border-sm',
  m: 'ta-btn-border-md',
  l: '',
};

const Button = ({
  to,
  as,
  type,
  size,
  style,
  action,
  onClick,
  children,
  external,
  iconType,
  className,
  testid,
  borderSize,
  handleRedirect = () => {},
  ...rest
}) => {
  const { disabled, icon } = rest;
  const classNames = [
    'ta-btn',
    ...(className ? [className] : []),
    ...(children && icon
      ? ['ta-btn-with-icon']
      : !children && icon
      ? ['ta-btn-icon-only']
      : []),
    ...(size && SIZES[size] ? [SIZES[size]] : []),
    ...(borderSize && BORDER_SIZES[borderSize]
      ? [BORDER_SIZES[borderSize]]
      : []),
    ...Object.keys(TYPES).reduce(
      (acc, type) => (rest[type] ? [...acc, TYPES[type]] : [...acc]),
      []
    ),
  ];

  const handleOnClick = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) {
      if (as === 'link') {
        e.preventDefault();
        e.stopPropagation();
        if (to && to.length !== 0) {
          external ? window.open(to, '_blank') : handleRedirect(to);
        }
      }
      onClick(e);
    } else if (as === 'link' && !disabled) {
      if (action) action();
      if (external) return null;
      e.preventDefault();
      e.stopPropagation();
      if (!to || to.length === 0) return null;
      external ? window.open(to, '_blank') : handleRedirect(to);
    }
  };

  if (as === 'link') {
    return (
      <a
        type={type}
        className={classNames.join(' ')}
        onClick={handleOnClick}
        disabled={disabled}
        href={disabled ? undefined : to}
        data-testid={testid || 'link'}
        style={style}
        rel="noreferrer"
        target={external ? '_blank' : '_self'}
        {...preventHTMLKeyLeak(rest, HTML_LEAK_KEYS)}
      >
        {/* {icon && <FontAwesome5 icon={icon} type={iconType} />} */}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type || 'button'}
      data-testid={testid || 'button'}
      onClick={handleOnClick}
      className={classNames.join(' ')}
      disabled={disabled}
      style={style}
      {...preventHTMLKeyLeak(rest, HTML_LEAK_KEYS)}
    >
      {/* {icon && <FontAwesome5 icon={icon} type={iconType} />} */}
      {children}
    </button>
  );
};

Button.propTypes = {
  to: PropTypes.string,
  as: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  style: PropTypes.object,
  action: PropTypes.func,
  onClick: PropTypes.func,
  iconType: PropTypes.string,
  external: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  testid: PropTypes.string,
  borderSize: PropTypes.oneOf(['s', 'm', 'l']),
  handleRedirect: PropTypes.func,
};

Button.defaultProps = {
  size: 'l',
  iconType: 's',
  isPrimary: true,
  isSecondary: false,
  isTertiary: false,
  isGhost: false,
  isBlock: false,
  isBlank: false,
  rounded: false,
  disabled: false,
};

export default Button;
