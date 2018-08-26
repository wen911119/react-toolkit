import React, { PureComponent } from 'react'

import { ScrollerWithRefreshAndLoadMore } from 'react-m-scroller'

export default class ListPro extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      a: 1
    }
  }
  render () {
    return (
      <div>
        <ScrollerWithRefreshAndLoadMore>
          <div>111</div>
        </ScrollerWithRefreshAndLoadMore>
      </div>
    )
  }
}
