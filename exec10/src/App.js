import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    terms: false
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Data Entry Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="1234 Main St"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Address 2</label>
            <input
              type="text"
              name="address2"
              placeholder="Apartment, studio, or floor"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>

          <div className="form-row three-columns">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Province</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
              >
                <option value="" disabled>Choose...</option>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="Ontario">Ontario</option>
                <option value="Prince Edward Island">Prince Edward Island</option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
              </select>
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms">Agree Terms & Condition?</label>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        {submittedData && (
          <div className="submitted-info">
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{submittedData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Full Name:</span>
              <span className="info-value">{submittedData.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address:</span>
              <span className="info-value">{submittedData.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">City:</span>
              <span className="info-value">{submittedData.city}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Province:</span>
              <span className="info-value">{submittedData.province}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Postal Code:</span>
              <span className="info-value">{submittedData.postalCode}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
