import React, { useState } from 'react';
import './App.css';

const defaultForm = {
  G1: '', G2: '', failures: '', Medu: '', Fedu: '',
  higher: 0, studytime: '', absences: '', goout: '',
  Walc: '', Dalc: '', age: '', romantic: 0, traveltime: ''
};

function ToggleSwitch({ name, value, onChange }) {
  return (
    <div className='toggle-group'>
      <label className='toggle-switch'>
        <input
          type="checkbox"
          checked={value === 1}
          onChange={(e) => onChange(name, e.target.checked ? 1 : 0)}
        />
        <span className='toggle-slider'></span>
      </label>
      <span className='toggle-label'>{value === 1 ? 'Yes' : 'No'}</span>
    </div>
  );
}

function SliderInput({ name, value, onChange, min, max, labels, ticks }) {
  return (
    <div className='slider-group'>
      <span className='slider-value'>
        {value !== '' ? value : min}
      </span>
      <input
        type='range'
        className='slider-input'
        name={name}
        min={min}
        max={max}
        value={value !== '' ? value : min}
        onChange={(e) => onChange(name, parseInt(e.target.value))}
      />
      {ticks && (
        <div className='slider-ticks'>
          {ticks.map((tick, i) => (
            <span key={i} className='slider-tick'>{tick}</span>
          ))}
        </div>
      )}
      {!ticks && labels && (
        <div className='slider-labels'>
          <span>{labels[0]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
}

const sections = [
  {
    title: 'Academic Performance',
    hint: 'Enter grades on a scale of 0 to 20',
    fields: [
      { key: 'G1', label: 'First Period Grade', min: 0, max: 20 },
      { key: 'G2', label: 'Second Period Grade', min: 0, max: 20 },
      { key: 'failures', label: 'Past Class Failures', min: 0, max: 3 },
      { key: 'absences', label: 'Number of Absences', min: 0, max: 93 },
      { key: 'studytime', label: 'Weekly Study Time', min: 1, max: 4, type: 'slider', labels: ['<2 hrs', '>10 hrs'], ticks: ['<2 hrs', '2-5 hrs', '5-10 hrs', '>10 hrs'] },
    ]
  },
  {
    title: 'Family Background',
    hint: 'Education levels: 0 = None to 4 = College',
    fields: [
      { key: 'Medu', label: "Mother's Education Level", min: 0, max: 4, type: 'slider', labels: ['None', 'College'], ticks: ['None', 'Primary', 'Middle', 'High School', 'College'] },
      { key: 'Fedu', label: "Father's Education Level", min: 0, max: 4, type: 'slider', labels: ['None', 'College'], ticks: ['None', 'Primary', 'Middle', 'High School', 'College'] },
    ]
  },
  {
    title: 'Student Profile',
    hint: 'Personal details about the student',
    fields: [
      { key: 'age', label: 'Student Age', min: 15, max: 22 },
      { key: 'higher', label: 'Wants Higher Education', type: 'toggle' },
      { key: 'romantic', label: 'In a Romantic Relationship', type: 'toggle' },
      { key: 'traveltime', label: 'Travel Time to School', min: 1, max: 4, type: 'slider', labels: ['<15 min', '>1 hr'], ticks: ['<15 min', '15-29 min', '30-59 min', '>1 hr'] },
    ]
  },
  {
    title: 'Lifestyle',
    hint: 'Rate each on a scale of 1 (very low) to 5 (very high)',
    fields: [
      { key: 'goout', label: 'Social Activity Level', min: 1, max: 5, type: 'slider', labels: ['Rarely', 'Very Often'] },
      { key: 'Walc', label: 'Weekend Alcohol Use', min: 1, max: 5, type: 'slider', labels: ['None', 'Very High'] },
      { key: 'Dalc', label: 'Weekday Alcohol Use', min: 1, max: 5, type: 'slider', labels: ['None', 'Very High'] },
    ]
  }
];

export default function App() {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (form.G1 === '') errors.G1 = 'Required';
    if (form.G2 === '') errors.G2 = 'Required';
    if (form.failures === '') errors.failures = 'Required';
    if (form.absences === '') errors.absences = 'Required';
    if (form.studytime === '') errors.studytime = 'Required';
    if (form.Medu === '') errors.Medu = 'Required';
    if (form.Fedu === '') errors.Fedu = 'Required';
    if (form.age === '') errors.age = 'Required';
    if (form.traveltime === '') errors.traveltime = 'Required';
    if (form.goout === '') errors.goout = 'Required';
    if (form.Walc === '') errors.Walc = 'Required';
    if (form.Dalc === '') errors.Dalc = 'Required';

    return errors;
  };
  
  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({})
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {};
      for (const key in form) {
        payload[key] = parseInt(form[key]);
      }

      const response = await fetch('https://learning-recommender-1xfe.onrender.com/recommend', {
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
      <h1>Learning Recommendation Engine</h1>
      <p className="subtitle">
        Enter a student's information to get personalized learning recommendations
      </p>

      <div className="card">
        <h2>Student Information</h2>
        {sections.map(({ title, hint, fields }) => (
          <div className="section" key={title}>
            <div className="section-header">
              <h3>{title}</h3>
              <p className="section-hint">{hint}</p>
            </div>
            <div className="form-grid">
              {fields.map(({ key, label, min, max, note, type, labels, ticks }) => (
                <div className="form-group" key={key}>
                  <div className="label-row">
                    <label>{label}</label>
                    {note && <span className="field-note">{note}</span>}
                  </div>
                  {type === 'toggle' ? (
                    <ToggleSwitch
                      name={key}
                      value={form[key]}
                      onChange={handleToggle}
                    />
                  ) : type === 'slider' ? (
                    <SliderInput
                      name={key}
                      value={form[key]}
                      onChange={handleToggle}
                      min={min}
                      max={max}
                      labels={labels}
                      ticks={ticks}
                    />
                  ) : (
                    <div>
                      <input
                        type="number"
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        min={min}
                        max={max}
                        className={fieldErrors[key] ? 'input-error' : ''}
                      />
                      {fieldErrors[key] && (
                        <span className="field-error-msg">{fieldErrors[key]}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(fieldErrors).length > 0 && (
          <div className='error'>
            Please fill in all fields before submitting.
          </div>
        )}

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Get Recommendations'}
        </button>

        {loading && (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Analyzing student profile...</p>
            <p className="loading-sub">
              If this is your first request in a while, the server may take
              up to 30 seconds to wake up. Thank you for your patience!
            </p>
          </div>
        )}

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
            <h3>Recommended Resources</h3>
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