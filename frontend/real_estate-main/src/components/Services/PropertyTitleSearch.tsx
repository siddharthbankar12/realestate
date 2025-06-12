// PropertyTitleSearch.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './ServicePages.css';

interface PropertyDetails {
  address: string;
  propertyId: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
}

const PropertyTitleSearch: React.FC = () => {
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
    address: '',
    propertyId: '',
    ownerName: '',
    phoneNumber: '',
    email: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPropertyDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Title search request submitted! We will contact you within 24 hours.');
    console.log('Property details:', propertyDetails);
  };

  return (
    <div className="service-page">
      <div className="service-container">
        <div className="service-header">
          <h1>Property Title Search</h1>
          <p>Verify property ownership and legal status with our comprehensive title search service</p>
        </div>

        <div className="service-content">
          <div className="service-info">
            <h2>What We Provide:</h2>
            <ul>
              <li>Complete ownership history verification</li>
              <li>Encumbrance certificate analysis</li>
              <li>Legal document verification</li>
              <li>Property tax status check</li>
              <li>Municipal approval verification</li>
              <li>Detailed title report within 48 hours</li>
            </ul>
            
            <div className="pricing-info">
              <h3>Service Fee: ₹2,500 - ₹5,000</h3>
              <p>Pricing varies based on property type and location</p>
            </div>
          </div>

          <div className="service-form">
            <h2>Request Title Search</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Property Address *</label>
                <textarea
                  name="address"
                  value={propertyDetails.address}
                  onChange={handleInputChange}
                  placeholder="Enter complete property address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Property ID/Survey Number</label>
                <input
                  type="text"
                  name="propertyId"
                  value={propertyDetails.propertyId}
                  onChange={handleInputChange}
                  placeholder="Enter property ID or survey number"
                />
              </div>

              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={propertyDetails.ownerName}
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
                    value={propertyDetails.phoneNumber}
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
                    value={propertyDetails.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Request Title Search
              </button>
            </form>
          </div>
        </div>

        <div className="process-steps">
          <h2>Our Process</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Submit Request</h3>
              <p>Fill out the form with property details</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Document Collection</h3>
              <p>We gather all relevant property documents</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Verification</h3>
              <p>Thorough verification of ownership and legal status</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Report Delivery</h3>
              <p>Detailed title report delivered within 48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PropertyTitleSearch };