import React from 'react';

const UrlItem = ({ url, expiryDate }) => {
  return (
    <div className="url-item">
      <p>Shortened URL: <a href={url.shortenedLink} target="_blank" rel="noopener noreferrer">{url.shortenedLink}</a></p>
      <p>Expiry Date: {expiryDate}</p>
    </div>
  );
};

export default UrlItem;