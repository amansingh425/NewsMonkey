import React, { Component } from 'react'

export default class NewsItem extends Component {
 
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="card my-3" >
       <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: "50%", zIndex: "1"}}>{source}</span>  
  <img src={!imageUrl?"https://www.livemint.com/lm-img/img/2023/08/07/600x338/smart_tv_1691386968377_1691386977183.jpg":imageUrl} className="card-img-top" alt="realted to news"/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
  </div>
</div>
    
    )
  }
}
