import React, { Component } from 'react'
import { XCenterView } from 'react-layout-suite'
import { ScrollerWithRefreshAndLoadMore } from 'react-m-scroller'
export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }
  componentDidMount () {
    console.log(13331)
  }

  render () {
    return (
      <ScrollerWithRefreshAndLoadMore height='400px'>
        <div>
          {this.state.list.map(item => (
            <XCenterView height={200} key={item}>
              <div>
                hello
                {item}
              </div>
            </XCenterView>
          ))}
        </div>
      </ScrollerWithRefreshAndLoadMore>
    )
  }
}
