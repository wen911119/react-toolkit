import React, { Component } from 'react'
import Tabs from '@ruiyun/react-m-tabs'
import ListPro from '@ruiyun/react-m-list-pro'
import { fetchFreeTasks, fetchChallengedTasks } from '../../services/task'
import ListItem from './listitem'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.renderItem = (item, index) => {
      return <ListItem content={item} />
    }
    this.format = ret => {
      let res = {
        list: ret,
        pageInfo: {
          totalPage: 1,
          currentPage: 1
        }
      }
      return res
    }
    this.keyExtractor = item => item.id
  }
  componentDidMount () {}

  onTabsChange (index) {
    console.log(index)
  }

  render () {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Tabs
          onChange={this.onTabsChange}
          titles={['待领任务', '已领任务']}
          titleSize={30}
          activeTitleColor='#181818'
          indicatorColor='#5581fa'
          titleColor='#ccc'
          fill
        >
          <ListPro
            format={this.format}
            fetchListData={fetchFreeTasks}
            renderItem={this.renderItem}
            height='100%'
            keyExtractor={this.keyExtractor}
            style={{backgroundColor: '#f4f4f4'}}
          />
          <ListPro
            format={this.format}
            fetchListData={fetchChallengedTasks}
            renderItem={this.renderItem}
            height='100%'
            keyExtractor={this.keyExtractor}
            style={{backgroundColor: '#f4f4f4'}}
          />
        </Tabs>
      </div>
    )
  }
}
