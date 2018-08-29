import React, { PureComponent } from 'react'

import { ScrollerWithRefreshAndLoadMore } from 'react-m-scroller'
import ListDataProvider from './listDataProvider'
import FlatList from './list'
export default class ListPro extends PureComponent {
  render () {
    return (
      <ListDataProvider {...this.props}>
        <ScrollerWithRefreshAndLoadMore>
          <FlatList />
        </ScrollerWithRefreshAndLoadMore>
      </ListDataProvider>
    )
  }
}
