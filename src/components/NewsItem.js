import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title , description,imageUrl,newsUrl,dateNtime,author} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
         <img src={imageUrl?imageUrl:'https://www.hindustantimes.com/ht-img/img/2023/11/13/1600x900/ISRAEL-PALESTINIANS--20_1699836286747_1699836321718.JPG'} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className='text-danger'>By {author?author:'unknown'}</p>
          <div className="d-flex justify-content-between">
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
          <p>{new Date(dateNtime).toLocaleDateString()}</p>
          <p>{new Date(dateNtime).toLocaleTimeString()}</p>
          </div>
       </div>
      </div>
     </div>
    )
  }
}

export default NewsItem
