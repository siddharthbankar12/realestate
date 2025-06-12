import React, { useState } from "react";
import styles from "./StaffTitleSearch.module.css";

type TitleSearchRequest = {
  _id: string;
  propertyType: "Residential" | "Commercial" | "Land";
  PropertyCity: string;
  PropertyState: string;
  propertyAddress: string;
  PropertyRegistrationNumber?: string;
  createdAt: string;
  ContactFullName: string;
  ContactEmail: string;
  ContactPhone: string;
  ContactNotes?: string;
};

interface StaffTitleSearchProps {
  titleSearchRequest: TitleSearchRequest[];
}

const StaffTitleSearch: React.FC<StaffTitleSearchProps> = ({
  titleSearchRequest,
}) => {
  const [filterType, setFilterType] = useState("All");
  const [searchId, setSearchId] = useState("");
  const [selectedContact, setSelectedContact] =
    useState<TitleSearchRequest | null>(null);

  const filteredRequests = titleSearchRequest
    .filter((request) =>
      filterType === "All" ? true : request.propertyType === filterType
    )
    .filter((request) =>
      searchId.trim() === "" ? true : request._id.includes(searchId.trim())
    );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Title Search Requests</h2>

      <div className={styles.controls}>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={styles.dropdown}
        >
          <option value="All">All Types</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </select>

        <input
          type="text"
          placeholder="Search by Request ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Property Type</th>
            <th>City</th>
            <th>State</th>
            <th>Address</th>
            <th>Reg. No</th>
            <th>Requested On</th>
            <th>Contact </th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>{request.propertyType}</td>
              <td>{request.PropertyCity}</td>
              <td>{request.PropertyState}</td>
              <td>{request.propertyAddress}</td>
              <td>{request.PropertyRegistrationNumber || "-"}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => setSelectedContact(request)}
                >
                  View Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedContact && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedContact(null)}
            >
              &times;
            </button>
            <h3>Contact Details</h3>
            <p>
              <strong>Full Name:</strong> {selectedContact.ContactFullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedContact.ContactEmail}
            </p>
            <p>
              <strong>Phone:</strong> {selectedContact.ContactPhone}
            </p>
            {selectedContact.ContactNotes && (
              <p>
                <strong>Notes:</strong> {selectedContact.ContactNotes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffTitleSearch;
