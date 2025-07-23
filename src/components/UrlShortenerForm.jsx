import React, { useState } from 'react';
import { validateUrl, validateValidityPeriod } from '../utils/validators';

const UrlShortenerForm = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    if (validity && !validateValidityPeriod(validity)) {
      setError('Validity period must be a positive integer.');
      return;
    }

    onSubmit({ url, validity: validity ? parseInt(validity) : null });
    setUrl('');
    setValidity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Long URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Validity Period (in minutes, optional):
          <input
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            min="1"
          />
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Shorten URL</button>
    </form>
  );
};

export default UrlShortenerForm;