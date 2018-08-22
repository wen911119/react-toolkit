import React, { Component } from 'react'
import { XCenterView } from 'react-layout-suite'
import Text from 'react-component-text'
import Swiper from 'react-m-swiper'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }
  componentDidMount () {
  }

  onTabsChange (index) {
    console.log(index)
  }

  render () {
    return (
      <Swiper onChange={this.onTabsChange}>
        <XCenterView height={600}>
          <Text size={30} color='#ccc'>
            hello1
          </Text>
        </XCenterView>
        <XCenterView height={600}>
          <Text size={30} color='#ccc'>
            hello2
          </Text>
        </XCenterView>
      </Swiper>
    )
  }
}
