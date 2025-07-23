import React from 'react';
import UrlItem from './UrlItem';

const UrlList = ({ urls }) => {
  return (
    <div>
      <h2>Shortened URLs</h2>
      <ul>
        {urls.map((url, index) => (
          <UrlItem key={index} url={url} />
        ))}
      </ul>
    </div>
  );
};

export default UrlList;