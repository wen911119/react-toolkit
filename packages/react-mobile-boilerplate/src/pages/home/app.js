import React, { Component } from 'react'
import { XCenterView } from 'react-layout-suite'

export default class HomePage extends Component {
  componentDidMount() {
    console.log(13331)
  }
  render() {
    return <XCenterView height={200}><div>hello</div></XCenterView>
  }
}
