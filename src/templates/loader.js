import React, { Component } from 'react'
import Loader from './spinner.gif'
export default class loader extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Loader} alt="loading..." style={{height:"30px"}} className='my-3'></img>
      </div>
    )
  }
}
