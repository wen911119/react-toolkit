import React, { Component } from 'react'
import ListPro from '@wj/react-m-list-pro'
import { XCenterView } from '@wj/react-layout-suite'
import Text from '@wj/react-text'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: '',
      extraData: {
        activeIndex: ''
      }
    }
    this.onItemClick = index => () => {
      this.setState({ extraData: { activeIndex: index } })
    }
    this.renderItem = (item, index, extraData) => {
      console.log(3333333)
      return (
        <div onClick={this.onItemClick(index)}>
          <XCenterView
            height={200}
            bgColor={extraData.activeIndex === index ? '#f8584f' : '#fff'}
          >
            <Text>{item.num}</Text>
          </XCenterView>
        </div>
      )
    }
  }
  format (ret) {
    let res = {
      list: [
        { active: false, num: Math.random() },
        { active: false, num: Math.random() },
        { active: false, num: Math.random() },
        { active: true, num: Math.random() },
        { active: false, num: Math.random() },
        { active: false, num: Math.random() },
        { active: false, num: Math.random() },
        { active: false, num: Math.random() },
        { active: false, num: Math.random() },
        { active: false, num: Math.random() }
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
        extraData={this.state.extraData}
      />
    )
  }
}
