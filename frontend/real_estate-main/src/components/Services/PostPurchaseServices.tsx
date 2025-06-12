import React, { useState, ChangeEvent, FormEvent } from 'react';
import './ServicePages.css';

interface ServiceRequest {
  propertyAddress: string;
  serviceType: string;
  description: string;
  clientName: string;
  phoneNumber: string;
  email: string;
  urgency: string;
}

interface ServiceCard {
  title: string;
  description: string;
  price: string;
}

const PostPurchaseServices: React.FC = () => {
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest>({
    propertyAddress: '',
    serviceType: '',
    description: '',
    clientName: '',
    phoneNumber: '',
    email: '',
    urgency: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setServiceRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Service request submitted! We will contact you within 24 hours to schedule the service.');
    console.log('Service request:', serviceRequest);
  };

  const services: ServiceCard[] = [
    {
      title: "Property Registration Support",
      description: "Complete assistance with property registration process",
      price: "₹3,000 - ₹8,000"
    },
    {
      title: "Home Loan Processing",
      description: "End-to-end home loan application and processing support",
      price: "₹5,000 - ₹12,000"
    },
    {
      title: "Interior Design Consultation",
      description: "Professional interior design and home setup guidance",
      price: "₹8,000 - ₹25,000"
    },
    {
      title: "Property Insurance",
      description: "Comprehensive property insurance advisory and setup",
      price: "₹2,000 - ₹5,000"
    },
    {
      title: "Utility Connections",
      description: "Electricity, water, gas, and internet connection assistance",
      price: "₹3,000 - ₹7,000"
    },
    {
      title: "Legal Compliance Check",
      description: "Ensure all legal formalities are completed correctly",
      price: "₹4,000 - ₹10,000"
    }
  ];

  return (
    <div className="service-page">
      <div className="service-container">
        <div className="service-header">
          <h1>Post Purchase Services</h1>
          <p>Complete support for your property after purchase</p>
        </div>

        <div className="services-grid">
          {services.map((service: ServiceCard, index: number) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price">{service.price}</div>
            </div>
          ))}
        </div>

        <div className="service-content">
          <div className="service-form">
            <h2>Request Service</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Property Address *</label>
                <textarea
                  name="propertyAddress"
                  value={serviceRequest.propertyAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your property address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Service Required *</label>
                <select
                  name="serviceType"
                  value={serviceRequest.serviceType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select service type</option>
                  <option value="registration">Property Registration Support</option>
                  <option value="homeloan">Home Loan Processing</option>
                  <option value="interior">Interior Design Consultation</option>
                  <option value="insurance">Property Insurance</option>
                  <option value="utilities">Utility Connections</option>
                  <option value="legal">Legal Compliance Check</option>
                  <option value="multiple">Multiple Services</option>
                </select>
              </div>

              <div className="form-group">
                <label>Service Description</label>
                <textarea
                  name="description"
                  value={serviceRequest.description}
                  onChange={handleInputChange}
                  placeholder="Describe your specific requirements or any additional details"
                />
              </div>

              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="clientName"
                  value={serviceRequest.clientName}
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
                    value={serviceRequest.phoneNumber}
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
                    value={serviceRequest.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Urgency Level</label>
                <select
                  name="urgency"
                  value={serviceRequest.urgency}
                  onChange={handleInputChange}
                >
                  <option value="">How urgent is this service?</option>
                  <option value="immediate">Immediate (Within 24 hours)</option>
                  <option value="week">Within a week</option>
                  <option value="month">Within a month</option>
                  <option value="flexible">Flexible timing</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">
                Request Service
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Need Help?</h2>
            <div className="contact-details">
              <div className="contact-item">
                <h4>📞 Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
              <div className="contact-item">
                <h4>📧 Email Us</h4>
                <p>services@yourcompany.com</p>
              </div>
              <div className="contact-item">
                <h4>💬 WhatsApp</h4>
                <p>+91 98765 43210</p>
              </div>
              <div className="contact-item">
                <h4>🕒 Working Hours</h4>
                <p>Mon-Sat: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostPurchaseServices };