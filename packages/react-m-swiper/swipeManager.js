import React, { PureComponent } from 'react'

export default class SwipeManager extends PureComponent {
  static getDerivedStateFromProps (props, state) {
    // 这里用anti-pattern是情况特殊
    const containerWidth = document.body.clientWidth
    const itemsNum = props.itemsNum || 2
    if (props.stage === 'swipe-moving') {
      if (
        (props.swipeDistance > 0 && state.index === 0) ||
        (props.swipeDistance < 0 && state.index === itemsNum - 1)
      ) {
        console.log('no-no-no', props.swipeDistance, state.index, itemsNum - 1)
        return null
      }
      return {
        swipeDistance: -state.index * containerWidth + props.swipeDistance,
        animation: false,
        freeze: true
      }
    } else if (props.stage === 'swipe-end') {
      if (
        (props.swipeDistance > 0 && state.index === 0) ||
        (props.swipeDistance < 0 && state.index === itemsNum - 1)
      ) {
        return null
      }
      let newIndex = state.index
      if (
        Math.abs(props.swipeDistance) > containerWidth / itemsNum ||
        props.speed > 0.6
      ) {
        // 滑动成功
        const increment = props.swipeDistance > 0 ? -1 : 1
        newIndex += increment
      }
      return {
        swipeDistance: -containerWidth * newIndex,
        animation: true,
        freeze: false,
        index: newIndex
      }
    } else if (props.stage === 'swipe-start') {
      return {
        swipeDistance: -containerWidth * state.index,
        animation: false,
        freeze: true
      }
    }
    return null
  }
  constructor (props) {
    super(props)
    this.state = {
      swipeDistance: props.swipeDistance,
      animation: false,
      freeze: false,
      index: 0
    }
  }
  render () {
    const { children, ...otherProps } = this.props
    const { animation, freeze, swipeDistance } = this.state
    return React.cloneElement(children, {
      freeze,
      animation,
      offset: swipeDistance,
      ...otherProps
    })
  }
}
