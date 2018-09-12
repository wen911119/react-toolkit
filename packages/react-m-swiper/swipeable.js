import React, { Component } from 'react'

const itemStyle = {
  width: '100vw',
  display: 'inline-block',
  height: '100%',
  verticalAlign: 'top',
  whiteSpace: 'normal'
}
const innerStyle = {
  display: 'inline-block',
  whiteSpace: 'nowrap'
}

export default class Swipeable extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (
      nextProps.offset === this.props.offset &&
      nextProps.animation === this.props.animation
    ) {
      return false
    }
    return true
  }
  render () {
    const {
      children,
      offset,
      animation,
      style = {},
      stage,
      speed,
      swipeDistance,
      ...otherProps
    } = this.props
    const _style = Object.assign({}, style, innerStyle, {
      transform: `translate3d(${offset}px,0,0)`,
      transition: animation ? '330ms' : 'none'
    })
    return (
      <div
        style={_style}
      >
        {children.map((child, i) => {
          return (
            <div key={i} style={itemStyle}>
              {React.cloneElement(child, {...otherProps})}
            </div>
          )
        })}
      </div>
    )
  }
}
