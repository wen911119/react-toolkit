import React, { PureComponent } from 'react'

export default class SwipeResponder extends PureComponent {
  constructor (props) {
    super(props)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.eventTarget = React.createRef()
    this.state = {
      distance: 0,
      speed: 0,
      stage: 'swipe-end'
    }
  }

  onTouchStart (e) {
    this.touchStartPoint = e.touches[0]
    this.touchStartTime = Date.now()
    console.log('touch-start-swiper')
    this.setState({ stage: 'swipe-start' })
  }
  onTouchMove (e) {
    const angle =
      (this.touchStartPoint.clientY - e.touches[0].clientY) /
      (this.touchStartPoint.clientX - e.touches[0].clientX)
    if (Math.abs(angle) < 0.5) {
      const distance = e.touches[0].clientX - this.touchStartPoint.clientX
      this.setState({ distance, stage: 'swipe-moving' })
      e.preventDefault()
    } else {
      this.touchStartPoint = e.touches[0]
    }
  }
  onTouchEnd (e) {
    console.log(e, 'touch-end-ooo')
    const distance = e.changedTouches[0].clientX - this.touchStartPoint.clientX
    const speed = Math.abs(distance / (Date.now() - this.touchStartTime))
    this.setState({ distance, speed, stage: 'swipe-end' })
  }
  componentDidMount () {
    this.eventTarget.current.addEventListener(
      'touchstart',
      e => {
        this.onTouchStart(e)
      },
      { passive: true }
    )
    this.eventTarget.current.addEventListener(
      'touchmove',
      e => {
        this.onTouchMove(e)
      },
      { passive: false }
    )
    this.eventTarget.current.addEventListener(
      'touchend',
      e => {
        this.onTouchEnd(e)
      },
      { passive: true }
    )
  }
  render () {
    const { children, style = {}, fill, ...otherProps } = this.props
    const { distance, speed, stage } = this.state
    let wrapStyle = {
      overflow: 'hidden'
    }
    if (fill) {
      wrapStyle.flex = 1
    }
    return (
      <div
        ref={this.eventTarget}
        style={Object.assign(style, wrapStyle)}
      >
        {React.cloneElement(children, {
          ...otherProps,
          swipeDistance: distance,
          speed,
          stage
        })}
      </div>
    )
  }
}
