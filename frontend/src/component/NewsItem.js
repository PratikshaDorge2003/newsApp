import React, { Component } from 'react'

export default class NewsItem extends Component {
 
  render() {
    let{desc}=this.props;
    return (
      
      <div className='item'>{desc}</div>
      
    )
  }
}
