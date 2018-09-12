import React, { Component } from 'react'
import { XCenterView } from '@ruiyun/react-layout-suite'
import Text from '@ruiyun/react-text'
import Swiper from '@ruiyun/react-m-swiper'

class Test extends Component {
  componentDidMount () {
    console.log('componentDidMountpppppp=====pppppp')
  }
  render () {
    return <div style={{ height: '300px' }}>hello-test</div>
  }
}
export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.state = {
      text: '123'
    }
  }
  componentDidMount () {}

  onClick () {
    console.log('uuuyuuuu')
    this.setState({ text: 'text233' })
  }

  render () {
    return (
      <div onClick={this.onClick}>
        <Swiper onChange={this.onTabsChange}>
          <Test />
          <XCenterView height={600}>
            <Text size={30} color='#ccc'>
              {this.state.text}
            </Text>
          </XCenterView>
        </Swiper>
      </div>
    )
  }
}
