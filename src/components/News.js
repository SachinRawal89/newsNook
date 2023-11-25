import React, { useEffect ,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export const News=(props)=>{
  
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);

  const capitalizeFirst=(title)=>{
    return  title[0].toUpperCase()+title.slice(1);
  }
    const update= async ()=>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let responseData = await data.json()
    props.setProgress(70);
    setArticles(responseData.articles);
    setLoading(false);
    setTotalResults(responseData.totalResults);
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title = `${capitalizeFirst(props.category)} - NewsMonkey`;
    update();
    /* eslint-disable */
  },[])
 
   const fetchMoreData= async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let responseData = await data.json()
    setArticles(responseData.articles);
    setTotalResults(responseData.totalResults);
  }
  
    return (
      <>
        <h1 className="text-center" style={{marginTop:'70px'}}>NewsMonkey - Top {capitalizeFirst(props.category)} headlines</h1>
        {loading?<Spinner/>:''}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
         <div className="row">
         {!loading && articles.map((elements)=>{
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
News.defaultProps={
  country: 'in',
  pageSize : 8,
  category:'general'
}
News.propTypes ={
  country: PropTypes.string,
  pageSize : PropTypes.number,
  category:PropTypes.string
}
export default News
