import React from 'react'

const NewsItem=(props)=>{ 
    return (
      <div className='my-3'>
        <div className="card">
         <img src={props.imageUrl?props.imageUrl:'https://www.hindustantimes.com/ht-img/img/2023/11/13/1600x900/ISRAEL-PALESTINIANS--20_1699836286747_1699836321718.JPG'} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p className='text-danger'>By {props.author?props.author:'unknown'}</p>
          <div className="d-flex justify-content-between">
          <a href={props.newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
          <p>{new Date(props.dateNtime).toLocaleDateString()}</p>
          <p>{new Date(props.dateNtime).toLocaleTimeString()}</p>
          </div>
       </div>
      </div>
     </div>
    )
    }

export default NewsItem
