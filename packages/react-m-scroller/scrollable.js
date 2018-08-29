import React, { PureComponent } from 'react'

export default class Scrollable extends PureComponent {
  render () {
    const {
      children,
      distance,
      action,
      header,
      footer,
      recomputeLayout, // 过了掉以下属性，要不然这些属性加到dom上会报警告
      onRefresh,
      onLoadMore,
      freeze,
      resetLoadMore,
      ...otherProps
    } = this.props
    let _style = { transition: action === 'none' ? '330ms' : 'none' }
    if (distance !== 0) {
      // 不能过早的加transform，因为在safari上，加了transform后动态内容高度会导致不能滚动
      _style.transform = `translate3d(0px, ${distance / 2}px, 0px)`
    }
    return (
      <div style={_style}>
        {header && header()}
        {React.cloneElement(children, {
          ...otherProps
        })}
        {footer && footer()}
      </div>
    )
  }
}
