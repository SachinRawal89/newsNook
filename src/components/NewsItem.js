import React from 'react';
import '../styles/Newsitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';

// Organize your images in an object
const images = {
  tech: [
    require('../Images/tech/tech1.jpg'),
    require('../Images/tech/tech2.jpg'),
    require('../Images/tech/tech3.jpeg'),
    require('../Images/tech/tech4.jpg'),
    require('../Images/tech/tech5.jpg')
  ],
  business: [
    require('../Images/business/bus1.avif'),
    require('../Images/business/bus2.jpg'),
    require('../Images/business/bus3.jpg'),
    require('../Images/business/bus4.jpg'),
    require('../Images/business/bus5.jpg')
  ],
  entertainment: [
    require('../Images/entertainment/ent1.webp'),
    require('../Images/entertainment/ent2.jpg'),
    require('../Images/entertainment/ent3.png'),
    require('../Images/entertainment/ent4.jpg'),
    require('../Images/entertainment/ent5.jpeg')
  ],
  health: [
    require('../Images/health/hal1.jpeg'),
    require('../Images/health/hal2.avif'),
    require('../Images/health/hal3.webp'),
    require('../Images/health/hal4.avif'),
    require('../Images/health/hal5.jpg')
  ],
  science: [
    require('../Images/science/sci1.avif'),
    require('../Images/science/sci2.jpg'),
    require('../Images/science/sci3.jpg'),
    require('../Images/science/sci4.jpg'),
    require('../Images/science/sci5.jpg')
  ],
  sports: [
    require('../Images/sports/spt1.jpg'),
    require('../Images/sports/spt2.webp'),
    require('../Images/sports/spt3.webp'),
    require('../Images/sports/spt4.webp'),
    require('../Images/sports/spt5.jpg')
  ]
};
// Utility function to format the published date and time ago
const formatPublishedDate = (publishedAt) => {
  const date = new Date(publishedAt);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  
  let timeAgo;

  if (seconds < 60) {
    timeAgo = `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    timeAgo = `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    timeAgo = `${hours} hr${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    timeAgo = `${days} day${days !== 1 ? 's' : ''} ago`;
  } else {
    timeAgo = `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  }

  return { formattedDate, timeAgo };
};
const NewsItem = ({ news }) => {

  const { formattedDate, timeAgo } = formatPublishedDate(news.published_at);

  // Function to clean up HTML entities from description
  const cleanDescription = (text) => {
    if (!text) return "No description available.";  // Fallback if no description
    return text
      .replace(/&nbsp;/g, ' ')  // Replace non-breaking spaces
      .replace(/<[^>]+>/g, '')  // Remove any HTML tags (if any)
      .slice(0, 150) + (text.length > 150 ? "..." : "");  // Truncate the description to 150 characters and append "..."
  };
  const handleBookmark = () => {
    console.log("News bookmarked!");
  };

  const handleShare = () => {
    console.log("News shared!");
  };

  // Hashing function to generate a numeric value from the title and author
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash); // Ensure positive hash
  };

  // Function to get a consistent random number between 0 and 4 based on title and author
  const getRandomNumberFromArticle = (title, author) => {
    const hash = hashString(title + (author || 'unknown')); // Combine title and author for hashing
    return hash % 5;  // Restrict number to between 0 and 4
  };

  // Function to get related image based on category
  const getRelatedImg = (category, title, author) => {

    if (category === 'general') return 'https://www.indiantelevision.com/sites/default/files/styles/smartcrop_800x800/public/images/tv-images/2021/08/02/news.jpg?itok=eEnb05ue';

    // Map of categories to their corresponding keys
    const categoryMap = {
      business: 'business',
      entertainment: 'entertainment',
      tech: 'tech',
      sports: 'sports',
      health: 'health',
      science: 'science'
    };

    // Get the key for the given category
    const key = categoryMap[category.toLowerCase()];
    if (!key) {
      console.error('Invalid category');
      return null; // Return null or handle error as needed
    }

    // Get the array of images for the specified category
    const categoryImages = images[key];

    // Get a consistent random image from the category based on the title and author
    const randomImageIndex = getRandomNumberFromArticle(title, author);

    return categoryImages[randomImageIndex];
  };

  return (
    <div className="news-card">
    <div className="image-container">
      <img
        src={news.image ? news.image : getRelatedImg(news.category, news.title, news.author)}
        alt="News"
        className="news-image"
      />
      <div className="icon-container">
        <FontAwesomeIcon 
          icon={faBookmark} 
          className="icon bookmark-icon" 
          onClick={handleBookmark} 
        />
        <FontAwesomeIcon 
          icon={faShare} 
          className="icon share-icon" 
          onClick={handleShare} 
        />
      </div>
    </div>
    <div className="news-content">
      <h5 className="news-title">{news.title}</h5>
      <p className="news-description">{cleanDescription(news.description)}</p>
      <div className="news-sources">
        {news.source ? news.source : 'unknown'}
      </div>
      <div className="news-footer">
        <a href={news.url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read More
        </a>
        <span className="news-date">{formattedDate} ({timeAgo})</span>
      </div>
    </div>
  </div>
  );
};

export default NewsItem;
