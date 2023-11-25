import React, { Component } from 'react'
import spinner from './spinner.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
         <img src={spinner} alt="" style={{height:90,width:90}} />
      </div>
    )
  }
}

export default Spinner
