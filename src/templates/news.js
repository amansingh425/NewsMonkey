import React, { Component } from 'react'
import NewsItem from './newsitem'
import Loader from './loader.js'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export default class News extends Component {
       static defaultProps={
           country: "in",
           pageSize: 8,
           category: "general"
       }
       static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
       }

        capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

   updateNews = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=53b331fbf6904cd0a1014978c9d7d09c&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({articles: parsedata.articles, loading:false,  totalResults: parsedata.totalResults});
  }

  async componentDidMount(){
    this.updateNews();
  }

     fetchMoreData = async()=>{ 
      this.setState({page: this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=53b331fbf6904cd0a1014978c9d7d09c&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({articles: this.state.articles.concat(parsedata.articles), totalResults: parsedata.totalResults}); 
     }

  render() {
    return (
       <div className='container my-3'>
        <h2 className='text-center'>{`NewsMonkey - Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h2>
        {this.state.loading && <Loader/>}
        <InfiniteScroll
          dataLength={this.state.articles?.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles?.length !== this.state.totalResults}
          loader={<h4>{<Loader/>}</h4>}
        >
      <div className='container'>
        <div className='row '>
        {this.state.articles?.map((element, i)=>{
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
}

