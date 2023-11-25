import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize : 8,
    category:'general'
  }
  static propTypes ={
    country: PropTypes.string,
    pageSize : PropTypes.number,
    category:PropTypes.string
  }
  constructor(props){
    super(props);
    this.state = {
       articles: [],
       loading: true,
       page: 1,
       totalResults:0
    }
    document.title = `${this.capitalizeFirst(this.props.category)} - NewsMonkey`;
  }
  capitalizeFirst(title){
    return  title[0].toUpperCase()+title.slice(1);
  }
   async update(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let responseData = await data.json()
    this.props.setProgress(70);
    this.setState({
      articles: responseData.articles,
      totalResults: responseData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.update();
  }
 
    fetchMoreData= async()=>{
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let responseData = await data.json()
    this.setState({
      articles: this.state.articles.concat(responseData.articles),
      totalResults: responseData.totalResults,
    })
  }
  render() {
    return (
      <>
        
        <h1 className="text-center">NewsMonkey - Top {this.capitalizeFirst(this.props.category)} headlines</h1>
        {this.state.loading?<Spinner/>:''}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
         <div className="row">
         {!this.state.loading &&this.state.articles.map((elements)=>{
            return <div key={elements.url} className="col-md-4">
                <NewsItem title={elements.title?elements.title:""} description ={elements.description?elements.description:""} imageUrl={elements.urlToImage} newsUrl={elements.url} dateNtime={elements.publishedAt} author={elements.author}/>
            </div>
         }) }
          </div>
          </div>
          </InfiniteScroll>
      </>
    )
  }
}

export default News
