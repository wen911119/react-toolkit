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
  format (ret) {
    let res = {
      list: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random()
      ],
      pageInfo: {
        totalPage: 5,
        currentPage: ret.pageNum
      }
    }
    return res
  }
  componentDidMount () {}

  fetchListData (p) {
    console.log(p, 222222)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(p)
      }, 2000)
    })
  }

  render () {
    return (
      <ListPro
        format={this.format}
        fetchListData={this.fetchListData}
        renderItem={this.renderItem}
        height='400px'
      />
    )
  }
}
