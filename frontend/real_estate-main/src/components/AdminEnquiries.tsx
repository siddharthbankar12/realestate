import React, { useState } from "react";
import styles from "./AdminEnquiries.module.css";

interface Property {
  _id: string;
  title: string;
  address: string;
  city: string;
  Bhk: number;
  price: number;
  Propreiter_name: string;
  Propreiter_contact: string;
  Propreiter_email: string;
  type: string;
  purpose: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
}

interface Enquiry {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  messageEn: string;
  propertyId?: Property;
  staffId?: string;
  userId?: User;
  isGuest?: boolean;
  createdAt?: string;
}

interface Props {
  enquiries: Enquiry[];
  onDeleteEnquiry?: (id: string) => void;
}

const AdminEnquiries: React.FC<Props> = ({ enquiries, onDeleteEnquiry }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  return (
    <div className={styles.enquiryContainer}>
      <h2>Enquiries</h2>

      {enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <table className={styles.enquiryTable}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Property Name</th>
              <th>Guest / User</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id}>
                <td>{enquiry.fullName}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.phoneNumber}</td>
                <td>{enquiry.messageEn}</td>
                <td>
                  {enquiry.propertyId?.title ? (
                    <p
                      className={styles.propertyLink}
                      onClick={() => setSelectedProperty(enquiry.propertyId!)}
                    >
                      {enquiry.propertyId.title}
                    </p>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td
                  onClick={() => setSelectedEnquiry(enquiry)}
                  className={!enquiry.isGuest ? styles.guestUser : ""}
                >
                  {enquiry.isGuest ? "Guest" : "User"}
                </td>
                <td>
                  {enquiry.createdAt
                    ? new Date(enquiry.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDeleteEnquiry?.(enquiry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedProperty && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContainer}>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedProperty(null)}
              >
                X
              </button>
            </div>
            <h2 style={{ marginBottom: "20px" }}>{selectedProperty.title}</h2>
            <table className={styles.detailTable}>
              <tbody>
                <tr>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>{selectedProperty.city}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Address</strong>
                  </td>
                  <td>{selectedProperty.address}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Owner Name</strong>
                  </td>
                  <td>{selectedProperty.Propreiter_name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Owner Contact</strong>
                  </td>
                  <td>{selectedProperty.Propreiter_contact}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Owner Email</strong>
                  </td>
                  <td>{selectedProperty.Propreiter_email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Purpose</strong>
                  </td>
                  <td>{selectedProperty.purpose}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Type</strong>
                  </td>
                  <td>{selectedProperty.type}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedEnquiry && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedEnquiry(null)}
              >
                X
              </button>
            </div>

            {!selectedEnquiry.isGuest && selectedEnquiry.userId && (
              <>
                <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
                  User Information
                </h3>
                <table className={styles.detailTable}>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Name</strong>
                      </td>
                      <td>
                        {selectedEnquiry.userId.firstName}{" "}
                        {selectedEnquiry.userId.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email</strong>
                      </td>
                      <td>{selectedEnquiry.userId.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phone</strong>
                      </td>
                      <td>{selectedEnquiry.userId.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>City</strong>
                      </td>
                      <td>{selectedEnquiry.userId.city}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Address</strong>
                      </td>
                      <td>{selectedEnquiry.userId.address}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>State</strong>
                      </td>
                      <td>{selectedEnquiry.userId.state}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
