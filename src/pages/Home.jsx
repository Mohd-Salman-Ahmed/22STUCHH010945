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
      if (validity && (!/^\d+$/.test(validity) || parseInt(validity) <= 0)) {
        valid = false;
        return 'Validity must be a positive number.';
      }
      return '';
    });
    setErrors(newErrors);

    if (!valid) return;

    inputs.forEach(({ longUrl, validity }) => {
      const expiryDate = validity
        ? new Date(Date.now() + parseInt(validity) * 60000).toLocaleString()
        : 'No expiry';
      const fakeShort = 'https://short.ly/' + Math.random().toString(36).substring(2, 8);
      addUrl(fakeShort, expiryDate);
    });

    setInputs([{ longUrl: '', validity: '' }]);
    setErrors(['']);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      {inputs.map((input, idx) => (
        <div key={idx} style={{
          marginBottom: 12,
          border: '1px solid #ddd',
          borderRadius: 6,
          padding: 10,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <input
            type="url"
            placeholder="Enter long URL"
            value={input.longUrl}
            onChange={e => handleChange(idx, 'longUrl', e.target.value)}
            required
            style={{
              flex: 2,
              padding: 8,
              borderRadius: 4,
              border: '1px solid #bbb'
            }}
          />
          <input
            type="number"
            placeholder="Validity (min, optional)"
            value={input.validity}
            min="1"
            onChange={e => handleChange(idx, 'validity', e.target.value)}
            style={{
              width: 140,
              padding: 8,
              borderRadius: 4,
              border: '1px solid #bbb'
            }}
          />
          {inputs.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveField(idx)}
              style={{
                background: '#e57373',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '6px 12px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          )}
          {errors[idx] && <div style={{ color: 'red', fontSize: 13 }}>{errors[idx]}</div>}
        </div>
      ))}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          onClick={handleAddField}
          disabled={inputs.length >= 5}
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 16px',
            cursor: inputs.length >= 5 ? 'not-allowed' : 'pointer'
          }}
        >
          Add Another URL
        </button>
        <button
          type="submit"
          style={{
            background: '#43a047',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Shorten URLs
        </button>
      </div>
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
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff'
    }}>
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