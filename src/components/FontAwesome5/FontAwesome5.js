import React from 'react'

const FontAwesome5 = props => {
  const { type, icon, color, className, spin, ...rest } = props
  let suffix = 'r'
  if (type === 'regular' || type === 'r') suffix = 'r'
  if (type === 'solid' || type === 's') suffix = 's'
  if (type === 'light' || type === 'l') suffix = 'l'
  if (type === 'brand' || type === 'b') suffix = 'b'
  const classNames = [`fa${suffix}`]
  if (icon) classNames.push(`fa-${icon}`)
  if (className) classNames.push(className)
  if (spin) classNames.push('fa-spin')
  const styles = {}
  if (color) styles.color = color

  return (
    <i className={classNames.join(' ')} style={styles} data-testid='font-awesome' {...rest} />
  )
}

export default FontAwesome5
