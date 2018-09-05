import React, { Component } from 'react'
import { XCenterView } from '@ruiyun/react-layout-suite'
import Text from '@ruiyun/react-text'
import Tabs from '@ruiyun/react-m-tabs'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }
  componentDidMount () {}

  onTabsChange (index) {
    console.log(index)
  }

  render () {
    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <Tabs onChange={this.onTabsChange} titles={['tab1', 'tab2']} fill>
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
        </Tabs>
      </div>
    )
  }
}
