import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
} from '../../lib'

function ListHeader(props) {
  const { children, className } = props
  const classes = cx(className, 'header')
  const rest = getUnhandledProps(ListHeader, props)
  const ElementType = getElementType(ListHeader, props)

  return <ElementType {...rest} className={classes}>{children}</ElementType>
}

ListHeader._meta = {
  name: 'ListHeader',
  parent: 'List',
  type: META.TYPES.ELEMENT,
}

ListHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content of the ListHeader. */
  children: PropTypes.node,

  /** Classes to add to the ListHeader className. */
  className: PropTypes.string,
}

export default ListHeader
