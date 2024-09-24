import React, { Component } from 'react'
import animation from '../Images/news.gif'

const Spinner=()=> {
    return (
      <div className='text-center'>
         <img src={animation} alt="" style={{height:150,width:150, objectFit:'cover'}} />
         <h5>fetching...</h5>
      </div>
    )
}

export default Spinner
