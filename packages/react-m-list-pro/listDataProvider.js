import React, { PureComponent } from 'react'

export default class ListPro extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: [1, 2, 3, 4, 5]
    }
  }
  render () {
    const { children, ...otherProps } = this.props
    return React.cloneElement(this.props.children, {
      ...otherProps,
      data: this.state.data
    })
  }
}
