import cx from 'classnames'
import React, { Component, PropTypes } from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  SUI,
  useKeyOnly,
} from '../../lib'
import Image from '../../elements/Image'

import CardContent from './CardContent'
import CardDescription from './CardDescription'
import CardGroup from './CardGroup'
import CardHeader from './CardHeader'
import CardMeta from './CardMeta'

const _meta = {
  name: 'Card',
  type: META.TYPES.VIEW,
  props: {
    color: SUI.COLORS,
  },
}

/**
 * A card displays site content in a manner similar to a playing card
 */
export default class Card extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A Card can center itself inside its container. */
    centered: PropTypes.bool,

    /** Primary content of the Card. */
    children: customPropTypes.every([
      customPropTypes.disallow(['description', 'header', 'image', 'meta']),
      PropTypes.node,
    ]),

    /** Classes that will be added to the Card className. */
    className: PropTypes.string,

    /** A Card can be formatted to display different colors. */
    color: PropTypes.oneOf(_meta.props.color),

    /** Shorthand prop for CardDescription. Mutually exclusive with children. */
    description: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.node,
    ]),

    /** Shorthand prop for CardContent containing extra prop. Mutually exclusive with children. */
    extra: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.node,
    ]),

    /** A Card can be formatted to take up the width of its container. */
    fluid: PropTypes.bool,

    /** Shorthand prop for CardHeader. Mutually exclusive with children. */
    header: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.node,
    ]),

    /** Render as an `a` tag instead of a `div` and adds the href attribute. */
    href: PropTypes.string,

    /** A card can contain an Image component. */
    image: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.node,
    ]),

    /** Shorthand prop for CardMeta. Mutually exclusive with children. */
    meta: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.node,
    ]),

    /** Render as an `a` tag instead of a `div` and called with event on Card click. */
    onClick: PropTypes.func,

    /** A Card can be formatted to raise above the page. */
    raised: PropTypes.bool,
  }

  static _meta = _meta

  static Content = CardContent
  static Description = CardDescription
  static Group = CardGroup
  static Header = CardHeader
  static Meta = CardMeta

  handleClick = (e) => {
    const { onClick } = this.props

    if (onClick) onClick(e)
  }

  render() {
    const {
      centered,
      children,
      className,
      color,
      description,
      extra,
      fluid,
      header,
      href,
      image,
      meta,
      onClick,
      raised,
    } = this.props

    const classes = cx(
      'ui',
      color,
      useKeyOnly(centered, 'centered'),
      useKeyOnly(fluid, 'fluid'),
      useKeyOnly(raised, 'raised'),
      'card',
      className,
    )
    const rest = getUnhandledProps(Card, this.props)
    const ElementType = getElementType(Card, this.props, () => {
      if (onClick) return 'a'
    })

    if (children) {
      return <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>{children}</ElementType>
    }

    return (
      <ElementType {...rest} className={classes} href={href} onClick={this.handleClick}>
        {Image.create(image)}
        {(description || header || meta) && (
          <CardContent description={description} header={header} meta={meta} />
        )}
        {extra && <CardContent extra>{extra}</CardContent>}
      </ElementType>
    )
  }
}
