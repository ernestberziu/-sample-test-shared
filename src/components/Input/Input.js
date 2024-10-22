import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import './Input.css';
import FontAwesome5 from '../FontAwesome5/FontAwesome5';
import Error from '../Error/Error';

const Input = forwardRef(
  (
    {
      name,
      prefix,
      addon,
      limit,
      type,
      value,
      isDisabled,
      isClearable,
      onFocus,
      onBlur,
      onChange,
      onChangeAddon,
      onReset,
      label,
      isMandatory,
      isOnMobile,
      hideError,
      errors,
      className,
      autoFocus,
      isPasswordToggleHidden,
      isAddonText,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputType, setInputType] = useState(type);
    const classNames = ['ta-input'];
    if (className) classNames.push(className);
    if (isFocused) classNames.push('ta-input__is-focused');
    if (value) classNames.push('ta-input__is-filled');
    if (isDisabled) classNames.push('ta-input__is-disabled');
    if (errors.length > 0) classNames.push('ta-input__has-error');
    if (isOnMobile) classNames.push('ta-input__is-on-mobile');
    const inputClassNames = ['ta-input__control'];
    if (addon || limit) inputClassNames.push('ta-input__has-addon');
    const addonClassNames = ['ta-input__addon'];
    if (isAddonText) addonClassNames.push('ta-input__addon__is-text');
    const prefixClassNames = ['ta-input__prefix'];
    if (isAddonText) prefixClassNames.push('ta-input__prefix__is-text');

    const handleOnFocus = () => {
      setIsFocused(true);
      onFocus && onFocus();
    };

    const handleOnBlur = () => {
      setIsFocused(false);
      onBlur && onBlur();
    };

    const handleOnChange = (e) => {
      const { target } = e || {};
      let { value: targetValue } = target || {};
      targetValue = targetValue || '';
      onChange && onChange(name, targetValue);
      onChangeAddon && onChangeAddon(name, targetValue);
    };

    const handlePasswordFieldTypeToggle = () => {
      setInputType(inputType === 'password' ? 'text' : 'password');
    };

    return (
      <div className={classNames.join(' ')} ref={ref}>
        <div className="ta-input__control-wrapper">
          {prefix && <div className={prefixClassNames.join(' ')}>{prefix}</div>}
          <div className="ta-input__control-inner-wrapper">
            {label && (
              <label>
                {label}
                {isMandatory && ' *'}
              </label>
            )}
            <input
              className={inputClassNames.join(' ')}
              type={inputType}
              name={name}
              value={value}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              maxLength={limit}
              disabled={isDisabled}
              autoComplete="off"
              autoFocus={autoFocus}
            />
          </div>
        </div>
        {addon && <div className={addonClassNames.join(' ')}>{addon}</div>}
        {limit && (
          <div className="ta-input__addon ta-input__addon__is-text">
            {`${value.length} / ${limit}`}
          </div>
        )}
        {isClearable && value && (
          <div className="ta-input__btn-clear" onClick={onReset}>
            <FontAwesome5 icon="times" type="solid" />
          </div>
        )}
        {type === 'password' && !isPasswordToggleHidden && (
          <div
            className="ta-input__password-toggle-btn"
            onClick={handlePasswordFieldTypeToggle}
          >
            <FontAwesome5
              icon={inputType === 'password' ? 'eye' : 'eye-slash'}
            />
          </div>
        )}
        {!hideError && <Error errors={errors} hasHalfTopOffset />}
      </div>
    );
  }
);

Input.propTypes = {
  prefix: PropTypes.string,
  addon: PropTypes.node,
  limit: PropTypes.number,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isDisabled: PropTypes.bool,
  hintText: PropTypes.string,
  limitErrorText: PropTypes.string,
  isClearable: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onChangeAddon: PropTypes.func,
  onReset: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  isMandatory: PropTypes.bool,
  isOnMobile: PropTypes.bool,
  hideError: PropTypes.bool,
  errors: PropTypes.array,
  autoFocus: PropTypes.bool,
  isPasswordToggleHidden: PropTypes.bool,
  isAddonText: PropTypes.bool,
};

Input.defaultProps = {
  prefix: '',
  addon: '',
  limit: undefined,
  type: 'text',
  value: '',
  isDisabled: false,
  hintText: '',
  limitErrorText: '',
  isClearable: false,
  label: '',
  isMandatory: false,
  isOnMobile: false,
  hideError: false,
  errors: [],
  isPasswordToggleHidden: false,
  isAddonText: false,
};

export default Input;
