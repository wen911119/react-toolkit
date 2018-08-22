import React, { PureComponent } from 'react'

const itemStyle = {
  width: '100vw',
  display: 'inline-block',
  height: '100%'
}

const innerStyle = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  lineHeight: 0
}

export class SwipeResponder extends PureComponent {
  constructor (props) {
    super(props)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.eventTarget = React.createRef()
  }

  onTouchStart (e) {
    this.touchStartPoint = e.touches[0]
    this.touchStartTime = Date.now()
    this.props.onSwipeStart()
  }
  onTouchMove (e) {
    const angle =
      (this.touchStartPoint.clientY - e.touches[0].clientY) /
      (this.touchStartPoint.clientX - e.touches[0].clientX)
    if (Math.abs(angle) < 0.5) {
      const distance = e.touches[0].clientX - this.touchStartPoint.clientX
      this.props.onSwiping({ distance })
      e.preventDefault()
    } else {
      this.touchStartPoint = e.touches[0]
    }
  }
  onTouchEnd (e) {
    const distance = e.changedTouches[0].clientX - this.touchStartPoint.clientX
    const speed = Math.abs(distance / (Date.now() - this.touchStartTime))
    this.props.onSwipeEnd({ distance, speed })
  }
  componentDidMount () {
    this.eventTarget.current.addEventListener(
      'touchmove',
      e => {
        this.onTouchMove(e)
      },
      { passive: false }
    )
  }
  render () {
    const { children, style = {} } = this.props
    return (
      <div
        ref={this.eventTarget}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        style={style}
      >
        {children}
      </div>
    )
  }
}

const Swipeable = ({
  children,
  index,
  offset,
  width,
  animation,
  style = {}
}) => {
  const translateX = (1 - index) * width + offset
  return (
    <div
      style={Object.assign({}, style, innerStyle, {
        transform: `translate3d(${translateX}px,0,0)`,
        transition: animation ? 'transform .3s' : null
      })}
    >
      {children.map((child, i) => {
        return (
          <div key={i} style={itemStyle}>
            {child}
          </div>
        )
      })}
    </div>
  )
}

export default class Swiper extends PureComponent {
  constructor (props) {
    super(props)
    this.onSwipeStart = this.onSwipeStart.bind(this)
    this.onSwiping = this.onSwiping.bind(this)
    this.onSwipeEnd = this.onSwipeEnd.bind(this)
    this.$env = {
      containerWidth: document.body.clientWidth
    }
    this.state = {
      activeIndex: 1,
      animation: false,
      distance: 0
    }
  }
  onSwipeStart () {
    this.setState({ animation: false })
  }
  onSwiping ({ distance }) {
    if (
      (distance > 0 && this.state.activeIndex === 1) ||
      (distance < 0 && this.state.activeIndex === this.props.children.length)
    ) {
      return
    }
    this.setState({ distance })
  }
  onSwipeEnd ({ distance, speed }) {
    if (
      (distance > 0 && this.state.activeIndex === 1) ||
      (distance < 0 && this.state.activeIndex === this.props.children.length)
    ) {
      return
    }
    const { children } = this.props
    const { containerWidth } = this.$env
    let base = { distance: 0, animation: true }
    if (Math.abs(distance) > containerWidth / children.length || speed > 0.6) {
      base.activeIndex = this.state.activeIndex + (distance > 0 ? -1 : 1)
      this.props.onChange && this.props.onChange(base.activeIndex)
    }
    this.setState(base)
  }
  render () {
    const { children, fill } = this.props
    const { containerWidth } = this.$env
    const { activeIndex, animation, distance } = this.state
    let wrapStyle = {
      overflow: 'hidden'
    }
    if (fill) {
      wrapStyle.flex = 1
    }
    return (
      <div style={wrapStyle}>
        <SwipeResponder
          onSwipeStart={this.onSwipeStart}
          onSwiping={this.onSwiping}
          onSwipeEnd={this.onSwipeEnd}
          style={{ lineHeight: 0, height: '100%' }}
        >
          <Swipeable
            index={activeIndex}
            width={containerWidth}
            animation={animation}
            offset={distance}
            style={{ height: '100%' }}
          >
            {children}
          </Swipeable>
        </SwipeResponder>
      </div>
    )
  }
}
