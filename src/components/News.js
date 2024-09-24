import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';

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
  const limit = props.pageSize; // The number of articles per page
  const url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${props.category}&languages=en&limit=${limit}&offset=${offset}`;

  setLoading(true);
  try {
    let data = await fetch(url);
    props.setProgress(30);
    let responseData = await data.json();
    props.setProgress(70);

    // Ensure response structure is handled correctly
    if (responseData.data) {
      // Filter out duplicate articles based on unique properties like 'title' and 'author'
      const uniqueArticles = responseData.data.filter((article, index, self) => 
        index === self.findIndex((a) => (
          a.title === article.title && a.author === article.author
        ))
      );
      setArticles(uniqueArticles); // Set the filtered batch of articles
      setTotalResults(responseData.pagination.total); // Set the total number of results
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
  const newOffset = offset + limit; // Increment offset for the next page
  const url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${props.category}&languages=en&limit=${limit}&offset=${newOffset}`;

  try {
    let data = await fetch(url);
    let responseData = await data.json();

    if (responseData.data) {
      // Filter out duplicate articles
      const uniqueArticles = responseData.data.filter((article, index, self) => 
        index === self.findIndex((a) => (
          a.title === article.title && a.author === article.author
        ))
      );

      // Append only unique articles to the existing list
      setArticles(articles.concat(uniqueArticles));
      setOffset(newOffset); // Update offset for pagination
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

  const [category, setCategory] = useState('general');
  const location = useLocation();

  // Function to map route to category
  useEffect(() => {
    const pathToCategory = {
      '/': 'general',
      '/business': 'business',
      '/entertainment': 'entertainment',
      '/health': 'health',
      '/sports': 'sports',
      '/technology': 'technology',
      '/science': 'science',
    };
    // Update the category state based on the current route
    setCategory(pathToCategory[location.pathname] || 'general');
  }, [location.pathname]);

  return (
    <>
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
            <div className="d-flex justify-content-center py-4">
              <h5 style={{color:'teal'}}>{`Stay Informed with the Latest ${capitalizeFirst(category)} News on Newsmonk`}</h5>
            </div>
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
