import React from 'react'

const NewsItem = (props)=>{
    return (
      <div className="card my-3" >
       <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: "50%", zIndex: "1"}}>{props.source}</span>  
  <img src={!props.imageUrl?"https://www.livemint.com/lm-img/img/2023/08/07/600x338/smart_tv_1691386968377_1691386977183.jpg":props.imageUrl} className="card-img-top" alt="realted to news"/>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.description}</p>
    <p className="card-text"><small className="text-body-secondary">By {!props.author?"Unknown":props.author} on {new Date(props.date).toGMTString()}</small></p>
    <a href={props.newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
  </div>
</div>
    
    )
}
export default NewsItem;