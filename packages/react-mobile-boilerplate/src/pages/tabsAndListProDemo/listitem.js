import React, { PureComponent } from 'react'
import { SlotColumnView, RowView, ColumnView } from '@ruiyun/react-layout-suite'
import Text from '@ruiyun/react-text'

const Line = ({ color = '#e8e8e8' }) => (
  <div
    style={{
      borderBottomColor: color,
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px'
    }}
  />
)

export default class ListItem extends PureComponent {
  constructor (props) {
    super(props)
    this.keyExtractor = item => item.id
  }
  render () {
    const {
      restaurantName,
      publishDate,
      address,
      city,
      reward
    } = this.props.content
    return (
      <div>
        <ColumnView padding={[0, 30, 0, 30]} bgColor='#fff' style={{marginTop: '10px'}}>
          <SlotColumnView slot={12} padding={[30, 0, 30, 0]}>
            <RowView>
              <Text color='#181818' size={36}>
                {restaurantName}
              </Text>
            </RowView>
            <RowView>
              <Text color='#999' size={26}>
                发布日期：
              </Text>
              <Text color='#181818' size={26}>
                {publishDate}
              </Text>
            </RowView>
            <RowView>
              <Text color='#999' size={26}>
                城市：
              </Text>
              <Text color='#181818' size={26}>
                {city}
              </Text>
            </RowView>
            <RowView>
              <Text color='#999' size={26}>
                餐厅地址：
              </Text>
              <Text color='#181818' size={26}>
                {address}
              </Text>
            </RowView>
          </SlotColumnView>
          <Line />
          <RowView hAlign='space-between' height={110}>
            <RowView>
              <Text color='#888' size={26}>
                任务奖励：
              </Text>
              <Text color='#ee7700' size={28}>
                {reward}元
              </Text>
            </RowView>
          </RowView>
        </ColumnView>
      </div>
    )
  }
}
