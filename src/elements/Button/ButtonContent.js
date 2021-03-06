import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  useKeyOnly,
} from '../../lib'

/**
 * Used in some Button types, such as `animated`
 */
function ButtonContent(props) {
  const { children, className, hidden, visible } = props
  const classes = cx(
    useKeyOnly(visible, 'visible'),
    useKeyOnly(hidden, 'hidden'),
    'content',
    className,
  )
  const rest = getUnhandledProps(ButtonContent, props)
  const ElementType = getElementType(ButtonContent, props)

  return <ElementType {...rest} className={classes}>{children}</ElementType>
}

ButtonContent._meta = {
  name: 'ButtonContent',
  parent: 'Button',
  type: META.TYPES.ELEMENT,
}

ButtonContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Initially visible, hidden on hover */
  visible: PropTypes.bool,

  /** Initially hidden, visible on hover */
  hidden: PropTypes.bool,

  /** Additional classes */
  className: PropTypes.string,

  /** Primary content, intended to the Button children */
  children: PropTypes.any,
}

export default ButtonContent
