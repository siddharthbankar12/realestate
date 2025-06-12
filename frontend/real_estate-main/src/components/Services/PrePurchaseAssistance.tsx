import React, { useState, ChangeEvent, FormEvent } from 'react';
import './ServicePages.css';

interface AssistanceRequest {
  propertyType: string;
  budget: string;
  location: string;
  requirements: string;
  clientName: string;
  phoneNumber: string;
  email: string;
  timeframe: string;
}

const PrePurchaseAssistance: React.FC = () => {
  const [assistanceRequest, setAssistanceRequest] = useState<AssistanceRequest>({
    propertyType: '',
    budget: '',
    location: '',
    requirements: '',
    clientName: '',
    phoneNumber: '',
    email: '',
    timeframe: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssistanceRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Pre-purchase assistance request submitted! Our expert will contact you shortly.');
    console.log('Assistance request:', assistanceRequest);
  };

  return (
    <div className="service-page">
      <div className="service-container">
        <div className="service-header">
          <h1>Pre-Purchase Assistance</h1>
          <p>Expert guidance throughout your property buying journey</p>
        </div>

        <div className="service-content">
          <div className="service-info">
            <h2>Our Services Include:</h2>
            <ul>
              <li>Property market analysis and valuation</li>
              <li>Legal document verification</li>
              <li>Property inspection and due diligence</li>
              <li>Negotiation support</li>
              <li>Home loan assistance</li>
              <li>Registration process guidance</li>
              <li>Investment feasibility analysis</li>
            </ul>

            <div className="pricing-info">
              <h3>Consultation Fee: ₹5,000 - ₹15,000</h3>
              <p>Comprehensive service package available</p>
            </div>

            <div className="expert-info">
              <h3>Expert Team</h3>
              <div className="experts-grid">
                <div className="expert">
                  <h4>Legal Experts</h4>
                  <p>Property law specialists</p>
                </div>
                <div className="expert">
                  <h4>Market Analysts</h4>
                  <p>Real estate valuation experts</p>
                </div>
                <div className="expert">
                  <h4>Financial Advisors</h4>
                  <p>Home loan and investment guidance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="service-form">
            <h2>Request Consultation</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Property Type *</label>
                  <select
                    name="propertyType"
                    value={assistanceRequest.propertyType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Independent House/Villa</option>
                    <option value="plot">Plot/Land</option>
                    <option value="commercial">Commercial Property</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Budget Range *</label>
                  <select
                    name="budget"
                    value={assistanceRequest.budget}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="10-25">₹10-25 Lakhs</option>
                    <option value="25-50">₹25-50 Lakhs</option>
                    <option value="50-100">₹50 Lakhs - 1 Crore</option>
                    <option value="100+">Above ₹1 Crore</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Preferred Location *</label>
                <input
                  type="text"
                  name="location"
                  value={assistanceRequest.location}
                  onChange={handleInputChange}
                  placeholder="Enter preferred location/area"
                  required
                />
              </div>

              <div className="form-group">
                <label>Specific Requirements</label>
                <textarea
                  name="requirements"
                  value={assistanceRequest.requirements}
                  onChange={handleInputChange}
                  placeholder="Describe your specific needs, preferences, and any special requirements"
                />
              </div>

              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="clientName"
                  value={assistanceRequest.clientName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={assistanceRequest.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={assistanceRequest.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Purchase Timeframe</label>
                <select
                  name="timeframe"
                  value={assistanceRequest.timeframe}
                  onChange={handleInputChange}
                >
                  <option value="">When are you planning to buy?</option>
                  <option value="immediate">Within 1 month</option>
                  <option value="3months">Within 3 months</option>
                  <option value="6months">Within 6 months</option>
                  <option value="1year">Within 1 year</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">
                Request Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PrePurchaseAssistance };