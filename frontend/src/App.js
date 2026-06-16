import React, { useState } from 'react';
import './App.css';

const defaultForm = {
  G1: '', G2: '', failures: '', Medu: '', Fedu: '',
  higher: '', studytime: '', absences: '', goout: '',
  Walc: '', Dalc: '', age: '', romantic: '', traveltime: ''
};

const fieldConfig = [
  { key: 'G1', label: 'First Period Grade', hint: '0 to 20' },
  { key: 'G2', label: 'Second Period Grade', hint: '0 to 20' },
  { key: 'failures', label: 'Past Failures', hint: '0, 1, 2, or 3' },
  { key: 'Medu', label: "Mother's Education", hint: '0 (none) to 4 (higher ed)' },
  { key: 'Fedu', label: "Father's Education", hint: '0 (none) to 4 (higher ed)' },
  { key: 'higher', label: 'Wants Higher Education', hint: '1 = yes, 0 = no' },
  { key: 'studytime', label: 'Weekly Study Time', hint: '1 (<2hrs) to 4 (>10hrs)' },
  { key: 'absences', label: 'Number of Absences', hint: '0 to 93' },
  { key: 'goout', label: 'Goes Out With Friends', hint: '1 (rarely) to 5 (very often)' },
  { key: 'Walc', label: 'Weekend Alcohol Use', hint: '1 (none) to 5 (very high)' },
  { key: 'Dalc', label: 'Weekday Alcohol Use', hint: '1 (none) to 5 (very high)' },
  { key: 'age', label: 'Student Age', hint: '15 to 22' },
  { key: 'romantic', label: 'In a Relationship', hint: '1 = yes, 0 = no' },
  { key: 'traveltime', label: 'Travel Time to School', hint: '1 (<15min) to 4 (>1hr)' },
];

export default function App() {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {};
      for (const key in form) {
        payload[key] = parseInt(form[key]);
      }

      const response = await fetch('http://127.0.0.1:8000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Something went wrong. Please check your inputs.');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🎓 Learning Recommendation Engine</h1>
      <p className="subtitle">
        Enter a student's information to get personalized learning recommendations
      </p>

      <div className="card">
        <h2>Student Information</h2>
        <div className="form-grid">
          {fieldConfig.map(({ key, label, hint }) => (
            <div className="form-group" key={key}>
              <label>{label}</label>
              <span>{hint}</span>
              <input
                type="number"
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={hint}
              />
            </div>
          ))}
        </div>

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Get Recommendations'}
        </button>

        {error && <div className="error">⚠️ {error}</div>}
      </div>

      {result && (
        <div className="result-card">
          <h2>Results</h2>
          <div className={`performance-badge badge-${result.performance_category}`}>
            {result.performance_category}
          </div>
          <p className="confidence">
            Model confidence: {Math.round(result.confidence * 100)}%
          </p>

          <div className="recommendations">
            <h3>📚 Recommended Resources</h3>
            {result.recommendations.map((rec, i) => (
              <div className="rec-item" key={i}>
                <a href={rec.url} target="_blank" rel="noreferrer">{rec.title}</a>
                <br />
                <span className="rec-type">{rec.type}</span>
                <p className="rec-reason">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}