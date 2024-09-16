import React from 'react';

const NewsItem = ({ news }) => {

  // Function to clean up HTML entities from description
  const cleanDescription = (text) => {
    if (!text) return "No description available.";  // Fallback if no description
    return text
      .replace(/&nbsp;/g, ' ')  // Replace non-breaking spaces
      .replace(/<[^>]+>/g, '')  // Remove any HTML tags (if any)
      .slice(0, 150) + (text.length > 150 ? "..." : "");  // Truncate the description to 150 characters and append "..."
  };

  return (
    <div className="my-3">
      <div className="card">
        <img
          src={news.image ? news.image : 'https://www.hindustantimes.com/ht-img/img/2023/11/13/1600x900/ISRAEL-PALESTINIANS--20_1699836286747_1699836321718.JPG'}
          className="card-img-top"
          alt="News"
        />
        <div className="card-body">
          <h5 className="card-title">{news.title}</h5>

          {/* Clean and truncated description */}
          <p className="card-text">{cleanDescription(news.description)}</p>

          <p className="text-danger">
            By {news.author ? news.author : 'unknown'} | Source: {news.source ? news.source : 'unknown'}
          </p>

          <div className="d-flex justify-content-between">
            <a href={news.url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
            <p>{new Date(news.published_at).toLocaleDateString()}</p>
            <p>{new Date(news.published_at).toLocaleTimeString()}</p>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span className="badge bg-info text-dark">Category: {news.category}</span>
            <span className="badge bg-primary">Country: {news.country.toUpperCase()}</span>
            <span className="badge bg-warning text-dark">Language: {news.language}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
