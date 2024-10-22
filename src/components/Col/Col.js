import React from 'react'
import PropTypes from 'prop-types'

import './Col.css'

const Col = props => {
  const { children, size, className } = props
  const classNames = ['ta-col']
  if (size) classNames.push(`ta-col__${size}`)
  if (className) classNames.push(className)

  return (
    <div className={classNames.join(' ')}>
      {children}
    </div>
  )
}

Col.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.any
}

Col.defaultProps = {
  size: null,
  className: '',
  children: null
}

export default Col
