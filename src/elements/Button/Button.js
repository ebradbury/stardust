import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  customPropTypes,
  createShorthandFactory,
  getElementType,
  getUnhandledProps,
  makeDebugger,
  META,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
  useValueAndKey,
} from '../../lib'
import Icon from '../Icon/Icon'
import Label from '../Label/Label'

import ButtonContent from './ButtonContent'
import ButtonGroup from './ButtonGroup'
import ButtonOr from './ButtonOr'

const debug = makeDebugger('button')

/**
 * A Button indicates a possible user action
 * @see Form
 * @see Icon
 * @see Label
 */
function Button(props) {
  const {
    active, animated, attached, basic, children, circular, className, color, compact, content, disabled, floated, fluid,
    icon, inverted, label, labelPosition, loading, negative, positive, primary, secondary, size, toggle,
  } = props

  const labeledClasses = cx(
    useKeyOrValueAndKey(labelPosition || !!label, 'labeled'),
  )

  const baseClasses = cx(
    color,
    size,
    useKeyOnly(active, 'active'),
    useKeyOrValueAndKey(animated, 'animated'),
    useKeyOrValueAndKey(attached, 'attached'),
    useKeyOnly(basic, 'basic'),
    useKeyOnly(circular, 'circular'),
    useKeyOnly(compact, 'compact'),
    useKeyOnly(disabled, 'disabled'),
    useValueAndKey(floated, 'floated'),
    useKeyOnly(fluid, 'fluid'),
    useKeyOnly(icon === true || icon && (labelPosition || !children && !content), 'icon'),
    useKeyOnly(inverted, 'inverted'),
    useKeyOnly(loading, 'loading'),
    useKeyOnly(negative, 'negative'),
    useKeyOnly(positive, 'positive'),
    useKeyOnly(primary, 'primary'),
    useKeyOnly(secondary, 'secondary'),
    useKeyOnly(toggle, 'toggle'),
  )
  const rest = getUnhandledProps(Button, props)
  const ElementType = getElementType(Button, props, () => {
    if (label || attached) return 'div'
  })
  const tabIndex = ElementType === 'div' ? 0 : undefined

  if (children) {
    const classes = cx('ui', baseClasses, labeledClasses, 'button', className)
    debug('render children:', { classes })
    return (
      <ElementType {...rest} className={classes} tabIndex={tabIndex}>
        {children}
      </ElementType>
    )
  }

  if (label) {
    const classes = cx('ui', baseClasses, 'button', className)
    const containerClasses = cx('ui', labeledClasses, 'button', className)
    debug('render label:', { classes, containerClasses }, props)
    const labelElement = Label.create(label, {
      basic: true,
      pointing: labelPosition === 'left' ? 'right' : 'left',
    })
    return (
      <ElementType {...rest} className={containerClasses}>
        {labelPosition === 'left' && labelElement}
        <button className={classes}>
          {Icon.create(icon)} {content}
        </button>
        {(labelPosition === 'right' || !labelPosition) && labelElement}
      </ElementType>
    )
  }

  if (icon && !label) {
    const classes = cx('ui', labeledClasses, baseClasses, 'button', className)
    debug('render icon && !label:', { classes })
    return (
      <ElementType {...rest} className={classes} tabIndex={tabIndex}>
        {Icon.create(icon)} {content}
      </ElementType>
    )
  }

  const classes = cx('ui', labeledClasses, baseClasses, 'button', className)
  debug('render default:', { classes })

  return (
    <ElementType {...rest} className={classes} tabIndex={tabIndex}>
      {content}
    </ElementType>
  )
}

Button.Content = ButtonContent
Button.Group = ButtonGroup
Button.Or = ButtonOr

Button._meta = {
  name: 'Button',
  type: META.TYPES.ELEMENT,
  props: {
    animated: ['fade', 'vertical'],
    attached: ['left', 'right', 'top', 'bottom'],
    color: [
      ...SUI.COLORS,
      'facebook',
      'twitter',
      'google plus',
      'vk',
      'linkedin',
      'instagram',
      'youtube',
    ],
    floated: SUI.FLOATS,
    labelPosition: ['right', 'left'],
    size: SUI.SIZES,
  },
}

Button.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A button can show it is currently the active user selection */
  active: PropTypes.bool,

  /** A button can animate to show hidden content */
  animated: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(Button._meta.props.animated),
  ]),

  /** A button can be attached to the top or bottom of other content */
  attached: PropTypes.oneOf(Button._meta.props.attached),

  /** A basic button is less pronounced */
  basic: PropTypes.bool,

  /** Primary content of the button */
  children: customPropTypes.every([
    PropTypes.node,
    customPropTypes.disallow(['label']),
    customPropTypes.givenProps(
      {
        icon: PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.object.isRequired,
          PropTypes.element.isRequired,
        ]),
      },
      customPropTypes.disallow(['icon']),
    ),
  ]),

  /** A button can be circular */
  circular: PropTypes.bool,

  /** Classes to add to the button className. */
  className: PropTypes.string,

  /** Primary content. Mutually exclusive with children. */
  content: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.string,
  ]),

  /** A button can have different colors */
  color: PropTypes.oneOf(Button._meta.props.color),

  /** A button can reduce its padding to fit into tighter spaces */
  compact: PropTypes.bool,

  /** A button can show it is currently unable to be interacted with */
  disabled: PropTypes.bool,

  /** A button can be aligned to the left or right of its container */
  floated: PropTypes.oneOf(Button._meta.props.floated),

  /** A button can take the width of its container */
  fluid: PropTypes.bool,

  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon: customPropTypes.some([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]),

  /** A button can be formatted to appear on dark backgrounds */
  inverted: PropTypes.bool,

  /** A labeled button can format a Label or Icon to appear on the left or right */
  labelPosition: PropTypes.oneOf(Button._meta.props.labelPosition),

  /** Add a Label by text, props object, or pass a <Label /> */
  label: customPropTypes.some([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]),

  /** A button can show a loading indicator */
  loading: PropTypes.bool,

  /** A button can hint towards a negative consequence */
  negative: PropTypes.bool,

  /** A button can hint towards a positive consequence */
  positive: PropTypes.bool,

  /** A button can be formatted to show different levels of emphasis */
  primary: PropTypes.bool,

  /** A button can be formatted to show different levels of emphasis */
  secondary: PropTypes.bool,

  /** A button can be formatted to toggle on and off */
  toggle: PropTypes.bool,

  /** A button can have different sizes */
  size: PropTypes.oneOf(Button._meta.props.size),
}

Button.defaultProps = {
  as: 'button',
}

Button.create = createShorthandFactory(Button, value => ({ content: value }))

export default Button
