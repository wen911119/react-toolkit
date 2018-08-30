import React, { PureComponent } from 'react'
import isEqual from 'lodash.isequal'
export default class ListPro extends PureComponent {
  constructor (props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
    this.previousParmas = props.pramas || {}
    this.previousPaginationInfo = props.paginationInfo
    this.state = {
      data: [],
      afterFirstRequest: false
    }
  }
  onRefresh (done) {
    this.props._onRefresh && this.props._onRefresh()
    this.onRefreshDone = done
  }
  onLoadMore (done) {
    this.props._onLoadMore && this.props._onLoadMore()
    this.onLoadMoreDone = done
  }
  async _fecthListData (p) {
    const { fetchListData, format } = this.props
    let newList = this.state.data
    const {
      list,
      pageInfo: { totalPage, currentPage }
    } = format(await fetchListData(p))
    if (currentPage === 1 || currentPage === 0) {
      newList = list
      this.onRefreshDone && this.onRefreshDone()
    } else {
      newList = newList.concat(list)
      this.onLoadMoreDone && this.onLoadMoreDone(totalPage <= currentPage)
    }
    this.setState({ data: newList, afterFirstRequest: true })
  }
  componentDidUpdate () {
    const { params = {}, paginationInfo, _onRefresh, loading } = this.props
    if (!isEqual(this.previousParmas, params)) {
      // 重新刷新
      loading && loading.show && loading.show()
      _onRefresh()
    } else if (!isEqual(this.previousPaginationInfo, paginationInfo)) {
      // 更新
      this._fecthListData(Object.assign({}, params, paginationInfo)).then(() => {
        loading && loading.hide && loading.hide()
      })
    }
    this.previousParmas = params
    this.previousPaginationInfo = paginationInfo
  }
  componentDidMount () {
    const { _onRefresh, loading } = this.props
    loading && loading.show && loading.show()
    _onRefresh()
  }
  render () {
    const { children, ...otherProps } = this.props
    return React.cloneElement(this.props.children, {
      ...otherProps,
      data: this.state.data,
      onRefresh: this.onRefresh,
      onLoadMore: this.onLoadMore,
      afterFirstRequest: this.state.afterFirstRequest
    })
  }
}
