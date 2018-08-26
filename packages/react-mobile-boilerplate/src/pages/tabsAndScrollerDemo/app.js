import React, { Component } from 'react'
import { XCenterView } from 'react-layout-suite'
import Text from 'react-component-text'
import Tabs from 'react-m-tabs'
import { ScrollerWithRefreshAndLoadMore } from 'react-m-scroller'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
  componentDidMount () {}

  onTabsChange (index) {
    console.log(index)
  }

  onRefresh (done) {
    setTimeout(() => {
      this.setState({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, done)
    }, 1500)
  }
  onLoadMore (done) {
    setTimeout(() => {
      let _list = Array.from(this.state.list)
      for (let l = _list.length, i = l + 1; i < l + 11; i++) {
        _list.push(i)
      }
      this.setState({ list: _list }, _ => done(_list.length >= 60))
    }, 1000)
  }

  render () {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Tabs onChange={this.onTabsChange} titles={['tab1', 'tab2']} fill>
          <ScrollerWithRefreshAndLoadMore
            height='100%'
            onRefresh={this.onRefresh}
            onLoadMore={this.onLoadMore}
          >
            <div>
              {this.state.list.map(item => (
                <XCenterView height={200} key={item}>
                  <Text size={30} color='#ccc'>
                    hello
                    {item}
                  </Text>
                </XCenterView>
              ))}
            </div>
          </ScrollerWithRefreshAndLoadMore>
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
