import React, { PureComponent } from 'react'
import Swiper from 'react-m-swiper'
export default class Tabs extends PureComponent {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      activeIndex: 1
    }
  }
  onChange (index) {
    this.setState({
      activeIndex: index
    })
  }
  render () {
    const { children, titles, style = {}, fill } = this.props
    const { activeIndex } = this.state
    let _style = {}
    if (fill) {
      _style = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }
    }
    return (
      <div style={Object.assign(_style, style)}>
        <div height={100}>
          {titles.map((t, index) => (
            <div
              style={{
                flex: 1
              }}
              key={index}
            >
              <span
                style={{
                  color: index === activeIndex - 1 ? '#f8584f' : '#000'
                }}
              >
                {t}
              </span>
            </div>
          ))}
        </div>
        <Swiper onChange={this.onChange} current={activeIndex} fill>
          {children}
        </Swiper>
      </div>
    )
  }
}
