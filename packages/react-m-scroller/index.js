import React, { PureComponent } from 'react'
import TouchResponder from './touchResponder'
import ScrollListener from './scrollListener'
import Scrollable from './scrollable'
import RefreshControl from './refreshControl'
import LoadMore from './loadMore'
export class Scroller extends PureComponent {
  recomputeLayout () {
    this.scrollListener.recomputeLayout()
  }
  constructor (props) {
    super(props)
    this.recomputeLayout = this.recomputeLayout.bind(this)
  }
  render () {
    const { children, ...otherProps } = this.props
    return (
      <ScrollListener {...otherProps} ref={s => (this.scrollListener = s)}>
        <TouchResponder>
          <Scrollable>{children}</Scrollable>
        </TouchResponder>
      </ScrollListener>
    )
  }
}

export class ScrollerWithRefresh extends PureComponent {
  recomputeLayout () {
    this.scrollListener.recomputeLayout()
  }
  constructor (props) {
    super(props)
    this.recomputeLayout = this.recomputeLayout.bind(this)
  }
  render () {
    const { children, ...otherProps } = this.props
    return (
      <ScrollListener {...otherProps} ref={s => (this.scrollListener = s)}>
        <TouchResponder>
          <RefreshControl>
            <Scrollable>{children}</Scrollable>
          </RefreshControl>
        </TouchResponder>
      </ScrollListener>
    )
  }
}

export class ScrollerWithLoadMore extends PureComponent {
  recomputeLayout () {
    this.scrollListener.recomputeLayout()
  }
  constructor (props) {
    super(props)
    this.recomputeLayout = this.recomputeLayout.bind(this)
  }
  render () {
    const { children, ...otherProps } = this.props
    return (
      <ScrollListener {...otherProps} ref={s => (this.scrollListener = s)}>
        <TouchResponder>
          <LoadMore>
            <Scrollable>{children}</Scrollable>
          </LoadMore>
        </TouchResponder>
      </ScrollListener>
    )
  }
}

export class ScrollerWithRefreshAndLoadMore extends PureComponent {
  recomputeLayout () {
    this.scrollListener.recomputeLayout()
  }
  constructor (props) {
    super(props)
    this.recomputeLayout = this.recomputeLayout.bind(this)
  }
  render () {
    const { children, ...otherProps } = this.props
    return (
      <ScrollListener {...otherProps} ref={s => (this.scrollListener = s)}>
        <TouchResponder>
          <LoadMore>
            <RefreshControl>
              <Scrollable>{children}</Scrollable>
            </RefreshControl>
          </LoadMore>
        </TouchResponder>
      </ScrollListener>
    )
  }
}

export default Scroller
