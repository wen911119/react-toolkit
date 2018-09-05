import React, { PureComponent } from 'react'

import { ScrollerWithRefreshAndLoadMore } from '@wj/react-m-scroller'
import ListDataProvider from './listDataProvider'
import FlatList from './list'
import Pagination from './pagination'

export default class ListPro extends PureComponent {
  render () {
    return (
      <Pagination {...this.props}>
        <ListDataProvider>
          <ScrollerWithRefreshAndLoadMore>
            <FlatList />
          </ScrollerWithRefreshAndLoadMore>
        </ListDataProvider>
      </Pagination>
    )
  }
}
