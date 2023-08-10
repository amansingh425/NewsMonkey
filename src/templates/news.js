import React, {useState, useEffect} from 'react'
import NewsItem from './newsitem'
import Loader from './loader.js'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
 const News = (props)=>{
    const [articles, setArticles] = useState([]);
    const [loading, SetLoading] = useState(true);
    const [page, SetPage] = useState(1);
    const [totalResults, SetTotalResults] = useState(0);


    const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

   const updateNews = async()=>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    SetLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedata = await data.json();
    props.setProgress(70);
    setArticles(parsedata.articles);
    SetLoading(false);
    SetTotalResults(parsedata.totalResults);
    props.setProgress(100);
  }

  useEffect(()=>{  
    updateNews();
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
     // eslint-disable-next-line 
  },[])



  const  fetchMoreData = async()=>{ 
    SetPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    setArticles(articles.concat(parsedata.articles));
    SetTotalResults(parsedata.totalResults);
     }

    return (
       <div className='container my-3'>
        <h2 className='text-center' style={{marginTop:"70px", marginBottom:"20px"}}>{`NewsMonkey - Top ${capitalizeFirstLetter(props.category)} Headlines`}</h2>
        {loading && <Loader/>}
        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length !== totalResults}
          loader={<h4>{<Loader/>}</h4>}
        >
      <div className='container'>
        <div className='row '>
        {articles?.map((element, i)=>{
          return <div className='col-md-4' key={i}>
          <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div> 
        })}

        </div>
        </div>
        </InfiniteScroll>        
      </div>
      
    )
  
}

 News.defaultProps={
  country: "in",
  pageSize: 8,
  category: "general"
}
News.propTypes={
country: PropTypes.string,
pageSize: PropTypes.number,
category: PropTypes.string
}

export default News;