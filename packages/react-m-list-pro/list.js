import React, { PureComponent } from 'react'

export default class ListPro extends PureComponent {
  render () {
    return (
      <div>
        {this.props.data.map((item, index) => (
          <div key={index}>{this.props.renderItem(item)}</div>
        ))}
      </div>
    )
  }
}
