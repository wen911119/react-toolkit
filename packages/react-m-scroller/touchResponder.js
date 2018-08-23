import React, { PureComponent, cloneElement } from 'react'
export default class TouchResponder extends PureComponent {
  onTouchStart (e) {
    if (this.props.position !== 'middle') {
      this.touchStartPoint = e.targetTouches[0]
    }
  }
  onTouchMove (e) {
    const { position, freeze } = this.props
    if (freeze) {
      return
    }
    if (position !== 'middle') {
      const angle =
        (this.touchStartPoint.clientY - e.touches[0].clientY) /
        (this.touchStartPoint.clientX - e.touches[0].clientX)
      if (Math.abs(angle) > 0.5) {
        // 判断角度，因为swiper的阀值是<0.5，所以这里要大于0.5
        const distance =
          e.targetTouches[0].screenY - this.touchStartPoint.screenY
        if (
          (distance > 0 && position === 'top') ||
          (distance < 0 && position === 'bottom')
        ) {
          // 下拉或上拉动作
          e.preventDefault()
          const action = position === 'top' ? 'pulldown' : 'pullup'
          this.setState({ distance, action })
        }
      }
    }
  }
  onTouchEnd () {
    if (this.props.position !== 'middle' && this.state.distance !== 0) {
      this.setState({ distance: 0, action: 'none' })
    }
  }
  constructor (props) {
    super(props)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.eventTargetRef = React.createRef()
    this.state = {
      action: 'none', // pulldown,pullup
      distance: 0
    }
  }
  componentDidMount () {
    this.eventTargetRef.current.addEventListener(
      'touchmove',
      e => {
        this.onTouchMove(e)
      },
      { passive: false }
    )
  }
  render () {
    const { children, ...otherProps } = this.props
    const { distance, action } = this.state
    return (
      <div
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        ref={this.eventTargetRef}
      >
        {cloneElement(children, { distance, action, ...otherProps })}
      </div>
    )
  }
}
