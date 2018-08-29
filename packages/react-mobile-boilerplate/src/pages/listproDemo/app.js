import React, { Component } from 'react'
import ListPro from 'react-m-list-pro'
import { XCenterView } from 'react-layout-suite'
import Text from 'react-component-text'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    this.renderItem = item => {
      return (
        <XCenterView height={200}>
          <Text>{item}</Text>
        </XCenterView>
      )
    }
  }
  componentDidMount () {}

  onTabsChange (index) {
    console.log(index)
  }

  render () {
    return <ListPro renderItem={this.renderItem} height='400px' />
  }
}
