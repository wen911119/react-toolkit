import React, { Component } from 'react'
import { XCenterView } from '@ruiyun/react-layout-suite'
import { ScrollerWithRefreshAndLoadMore } from '@ruiyun/react-m-scroller'
import Text from '@ruiyun/react-text'
import { fetchFreeTasks } from '../../services/task'
export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }
  async componentDidMount () {
    const ret = await fetchFreeTasks()
    console.log(ret, 99999)
  }

  render () {
    return (
      <ScrollerWithRefreshAndLoadMore height='400px'>
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
    )
  }
}
