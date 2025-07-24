import React, { useState } from 'react';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const UrlShortenerForm = ({ addUrl }) => {
  const [inputs, setInputs] = useState([{ longUrl: '', validity: '' }]);
  const [errors, setErrors] = useState(['']);

  const handleChange = (idx, field, value) => {
    const newInputs = [...inputs];
    newInputs[idx][field] = value;
    setInputs(newInputs);
  };

  const handleAddField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { longUrl: '', validity: '' }]);
      setErrors([...errors, '']);
    }
  };

  const handleRemoveField = (idx) => {
    setInputs(inputs.filter((_, i) => i !== idx));
    setErrors(errors.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = inputs.map(({ longUrl, validity }) => {
      if (!isValidUrl(longUrl)) {
        valid = false;
        return 'Please enter a valid URL.';
      }
      return '';
    });
    setErrors(newErrors);

    if (valid) {
      setInputs([{ longUrl: '', validity: '' }]);
      setErrors(['']);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, idx) => (
        <div key={idx}>
          <input
            type="text"
            value={input.longUrl}
            onChange={(e) => handleChange(idx, 'longUrl', e.target.value)}
            placeholder="Enter long URL"
          />
          <button type="button" onClick={() => handleRemoveField(idx)}>Remove</button>
          {errors[idx] && <p style={{ color: 'red' }}>{errors[idx]}</p>}
        </div>
      ))}
      <button type="button" onClick={handleAddField}>Add another URL</button>
      <button type="submit">Shorten URLs</button>
    </form>
  );
};

const Home = () => {
  const [urls, setUrls] = useState([]);

  const addUrl = (shortenedUrl, expiryDate) => {
    setUrls(prev => [...prev, { shortenedUrl, expiryDate }]);
  };

  return (
    
      <div style={{
        width: '50%',
        maxWidth: 9000,
        boxSizing: 'border-box',
        padding: 24,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px #0001'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>URL Shortener</h2>
        <UrlShortenerForm addUrl={addUrl} />
        <div>
          <h3>Shortened URLs</h3>
          {urls.length === 0 && <p style={{ color: '#888' }}>No URLs shortened yet.</p>}
          {urls.map((item, idx) => (
            <div key={idx} style={{
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: 8,
              padding: 12,
              marginBottom: 10
            }}>
              <div>
                <strong>Shortened URL:</strong>{' '}
                <a href={item.shortenedUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                  {item.shortenedUrl}
                </a>
              </div>
              <div>
                <strong>Expiry Date:</strong> {item.expiryDate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
