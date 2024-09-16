import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


// TODO ----------> 
// 1. IMAGE SIZE EVEN 
// 2. CARD REPRESENTAION IMPROVE
// 3. NAV AND TITLE CORRECT 
export const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);  // Offset for pagination
  const [totalResults, setTotalResults] = useState(0);  // Total results from the API

  const capitalizeFirst = (title) => {
    return title[0].toUpperCase() + title.slice(1);
  };

  // Function to fetch data from the API
  const updateNews = async () => {
    props.setProgress(10);
    const apiKey = process.env.REACT_APP_API_KEY;
    const limit = props.pageSize;  // The number of articles per page
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${props.category}&languages=en&limit=${limit}&offset=${offset}`;

    setLoading(true);
    try {
      let data = await fetch(url);
      props.setProgress(30);
      let responseData = await data.json();
      props.setProgress(70);

      // Ensure response structure is handled correctly
      if (responseData.data) {
        setArticles(responseData.data);  // Set the initial batch of articles
        setTotalResults(responseData.pagination.total);  // Set the total number of results
      }

      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching the news data', error);
      setLoading(false);
    }
  };

  // Fetch more data (for InfiniteScroll)
  const fetchMoreData = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const limit = props.pageSize;
    const newOffset = offset + limit;  // Increment offset for the next page
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${props.category}&languages=en&limit=${limit}&offset=${newOffset}`;

    try {
      let data = await fetch(url);
      let responseData = await data.json();

      if (responseData.data) {
        setArticles(articles.concat(responseData.data));  // Append new articles to the existing list
        setOffset(newOffset);  // Update offset for pagination
      }
    } catch (error) {
      console.error('Error fetching more data', error);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirst(props.category)} - NewsMonkey`;
    updateNews();  // Initial API call to load the first set of news
    /* eslint-disable-next-line */
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
      <h1 className="text-center" style={{ marginTop: '70px' }}>
        NewsNook
      </h1>

      {/* Show Spinner while loading */}
      {loading && <Spinner />}

      {/* Render InfiniteScroll once articles are available */}
      {articles.length > 0 && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}  // Stop scrolling when all articles are loaded
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((article) => (
                <div key={article.url} className="col-md-4">
                  <NewsItem news={article} />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,  // Default number of articles per page
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
