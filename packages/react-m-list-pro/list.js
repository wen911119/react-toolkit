import React, { PureComponent } from 'react'

export default class ListPro extends PureComponent {
  render () {
    return (
      <div>
        {this.props.data.map((item, index) => (
          <div
            key={
              this.props.keyExtractor ? this.props.keyExtractor(item) : index
            }
          >
            {this.props.renderItem(item, index, this.props.extraData)}
          </div>
        ))}
      </div>
    )
  }
}
