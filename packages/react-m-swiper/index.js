import React, { PureComponent } from 'react'
import SwipeResponder from './swipeResponder'
import Swipeable from './swipeable'
import SwipeManager from './swipeManager'

export default class Swiper extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: props.current || 0,
      animation: false,
      distance: 0,
      prevIndex: props.current,
      isSwiping: false
    }
  }
  render () {
    const { fill, children, ...otherProps } = this.props
    let wrapStyle = {
      overflow: 'hidden'
    }
    if (fill) {
      wrapStyle.flex = 1
    }
    return (
      <div style={wrapStyle}>
        <SwipeResponder {...otherProps}>
          <SwipeManager>
            <Swipeable>{children}</Swipeable>
          </SwipeManager>
        </SwipeResponder>
      </div>
    )
  }
}
