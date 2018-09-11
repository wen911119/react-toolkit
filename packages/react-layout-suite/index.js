import React from 'react'
import px2rem from 'p-to-r'

function alternateInsert (arr, item) {
  let insertedArr = arr.reduce(
    (all, current, index) =>
      all.concat(current, React.cloneElement(item, { key: index })),
    []
  )
  insertedArr.pop()
  return insertedArr
}

export const RowView = ({
  children,
  vAlign = 'center',
  hAlign = 'flex-start',
  height,
  width,
  bgColor = 'transparent',
  padding = [0, 0, 0, 0],
  margin = [0, 0, 0, 0],
  style = {},
  className
}) => (
  <div
    className={className}
    style={Object.assign(
      {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: vAlign,
        justifyContent: hAlign,
        backgroundColor: bgColor,
        paddingTop: px2rem(padding[0]),
        paddingRight: px2rem(padding[1]),
        paddingBottom: px2rem(padding[2]),
        paddingLeft: px2rem(padding[3]),
        marginTop: px2rem(margin[0]),
        marginRight: px2rem(margin[1]),
        marginBottom: px2rem(margin[2]),
        marginLeft: px2rem(margin[3]),
        height: px2rem(height),
        width: px2rem(width)
      },
      style
    )}
  >
    {children}
  </div>
)

export const ColumnView = ({
  children,
  flexDirection = 'column',
  vAlign = 'initial',
  hAlign = 'initial',
  padding = [0, 0, 0, 0],
  margin = [0, 0, 0, 0],
  bgColor = 'transparent',
  width,
  height,
  style = {},
  className
}) => {
  let mergedStyle = Object.assign(
    {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: hAlign,
      justifyContent: vAlign,
      backgroundColor: bgColor,
      paddingTop: px2rem(padding[0]),
      paddingRight: px2rem(padding[1]),
      paddingBottom: px2rem(padding[2]),
      paddingLeft: px2rem(padding[3]),
      marginTop: px2rem(margin[0]),
      marginRight: px2rem(margin[1]),
      marginBottom: px2rem(margin[2]),
      marginLeft: px2rem(margin[3])
    },
    style
  )
  if (height) {
    mergedStyle.height = px2rem(height)
  }
  if (width) {
    mergedStyle.width = px2rem(width)
  }
  return (
    <div className={className} style={mergedStyle}>
      {children}
    </div>
  )
}

export const XCenterView = ({
  className,
  children,
  style = {},
  height,
  width,
  bgColor = 'transparent'
}) => (
  <div
    className={className}
    style={Object.assign(
      {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
        height: px2rem(height),
        width: px2rem(width)
      },
      style
    )}
  >
    {children}
  </div>
)

export const SpaceHolder = ({ width = 0, height = 0 }) => (
  <div style={{ width: px2rem(width), height: px2rem(height) }} />
)

export const SlotRowView = ({ slot, children, ...otherProps }) => {
  let allChildren = children
  if (slot) {
    if (typeof slot === 'number') {
      allChildren = alternateInsert(children, <SpaceHolder width={slot} />)
    } else {
      allChildren = alternateInsert(children, slot)
    }
  }
  return <RowView {...otherProps}>{allChildren}</RowView>
}

export const SlotColumnView = ({ slot = 0, children, ...otherProps }) => {
  let allChildren = children
  if (slot) {
    if (typeof slot === 'number') {
      allChildren = alternateInsert(children, <SpaceHolder height={slot} />)
    } else {
      allChildren = alternateInsert(children, slot)
    }
  }
  return <ColumnView {...otherProps}>{allChildren}</ColumnView>
}
