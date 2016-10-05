import _ from 'lodash'
import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  customPropTypes,
  getUnhandledProps,
  getElementType,
  META,
  SUI,
} from '../../lib'
import BreadcrumbDivider from './BreadcrumbDivider'
import BreadcrumbSection from './BreadcrumbSection'

/**
 * A breadcrumb is used to show hierarchy between content.
 */
function Breadcrumb(props) {
  const { children, className, divider, icon, size, sections } = props
  const classes = cx('ui', className, size, 'breadcrumb')
  const rest = getUnhandledProps(Breadcrumb, props)
  const ElementType = getElementType(Breadcrumb, props)

  if (children) {
    return <ElementType {...rest} className={classes}>{children}</ElementType>
  }

  const dividerJSX = <BreadcrumbDivider icon={icon}>{divider}</BreadcrumbDivider>
  const sectionsJSX = []

  _.each(sections, ({ text, key, ...restSection }, index) => {
    const finalKey = key || text
    const dividerKey = `${finalKey}-divider`

    sectionsJSX.push(
      <BreadcrumbSection {...restSection} key={finalKey}>{text}</BreadcrumbSection>
    )

    if (index !== sections.length - 1) {
      sectionsJSX.push(React.cloneElement(dividerJSX, { key: dividerKey }))
    }
  })


  return <ElementType {...rest} className={classes}>{sectionsJSX}</ElementType>
}

Breadcrumb._meta = {
  name: 'Breadcrumb',
  type: META.TYPES.COLLECTION,
  props: {
    size: _.without(SUI.SIZES, 'medium'),
  },
}

Breadcrumb.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content of the Breadcrumb.Divider. */
  divider: customPropTypes.every([
    customPropTypes.disallow(['icon']),
    customPropTypes.contentShorthand,
  ]),

  /** For use with the sections prop. Render as an `Icon` component with `divider` class instead of a `div` in
   *  Breadcrumb.Divider. */
  icon: customPropTypes.every([
    customPropTypes.disallow(['divider']),
    customPropTypes.itemShorthand,
  ]),

  /** Shorthand array of props for Breadcrumb.Section. */
  sections: customPropTypes.itemsShorthand,

  /** Size of Breadcrumb */
  size: PropTypes.oneOf(Breadcrumb._meta.props.size),
}

Breadcrumb.Divider = BreadcrumbDivider
Breadcrumb.Section = BreadcrumbSection

export default Breadcrumb
