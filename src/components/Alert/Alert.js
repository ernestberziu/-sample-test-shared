import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FontAwesome5 from '../FontAwesome5/FontAwesome5';
import './Alert.css';
import Row from '../Row/Row';
import Col from '../Col/Col';

const Alert = (props) => {
  const {
    type,
    theme,
    label,
    noIcon,
    noBorder,
    autoHide,
    children,
    noOffset,
    isCompact,
    className,
    hasCloseButton,
    onCloseCallback,
    autoHideDuration,
  } = props;
  const [isActive, setIsActive] = useState(true);
  const timeoutRef = useRef(false);
  useEffect(() => {
    if (autoHide) {
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, Number(autoHideDuration || 5) * 1000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const availableThemes = ['success', 'alert', 'error', 'info', 'no-content'];
  const classNames = ['ta-alert'];
  classNames.push(
    availableThemes.indexOf(theme) > -1 ? theme : availableThemes[0]
  );
  if (className) classNames.push(className);
  if (autoHide) classNames.push('ta-alert__auto-hide');
  if (noBorder) classNames.push('ta-alert__no-border');
  if (isCompact) classNames.push('ta-alert__compact');
  let icon = 'check-square';
  if (theme === 'alert') icon = 'lightbulb';
  if (theme === 'error') icon = 'exclamation-triangle';
  if (theme === 'info') icon = 'info-circle';
  const isNoContent = theme === 'no-content';
  if (type === 'center' || isNoContent) classNames.push('ta-alert__center');
  if (!isActive) return null;
  const styles = { animation: 'alert-show 0.3s 1' };
  if (autoHide) {
    styles.animation = `alert-hide ${autoHideDuration || 5}s 1`;
  }

  return (
    <Row noOffset={noOffset}>
      <Col>
        <div
          className={classNames.join(' ')}
          style={{ ...styles }}
          data-testid="alert"
        >
          {label && (
            <div className="ta-alert__title" data-testid="alert-title">
              <div className="ta-alert__title-text">
                {!noIcon && !isNoContent && (
                  <FontAwesome5
                    className="ta-alert__title-text-icon"
                    icon={icon}
                    type="solid"
                  />
                )}
                {label}
              </div>
              {hasCloseButton && (
                <FontAwesome5
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsActive(false);
                    onCloseCallback && onCloseCallback();
                  }}
                  className="ta-alert__close-btn"
                  icon="times"
                  data-testid="alert-close"
                />
              )}
            </div>
          )}
          {!label && (
            <div className="ta-alert__icon" data-testid="alert-icon">
              <FontAwesome5 icon={icon} type="solid" />
            </div>
          )}
          {children && (
            <div
              className={`ta-alert__content ${label ? '' : 'no-label'}`}
              data-testid="alert-children"
            >
              {children}
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

Alert.propTypes = {
  autoHide: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  type: PropTypes.string,
  noIcon: PropTypes.bool,
  noBorder: PropTypes.bool,
  isCompact: PropTypes.bool,
  theme: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  noOffset: PropTypes.bool,
  className: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  onCloseCallback: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

Alert.defaultProps = {
  autoHide: false,
  autoHideDuration: 0,
  type: 'default',
  children: '',
  className: '',
  theme: 'success',
  label: '',
  noIcon: false,
  noBorder: false,
  isCompact: false,
  noOffset: false,
  hasCloseButton: false,
  onCloseCallback: null,
};

export default Alert;
