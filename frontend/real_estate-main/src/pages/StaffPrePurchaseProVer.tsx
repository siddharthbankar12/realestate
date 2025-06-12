import React, { useState } from "react";
import styles from "./StaffPrePurchaseProVer.module.css";

type PrePurchaseRequest = {
  _id: string;
  FullName: string;
  Email: string;
  Phone: string;
  Address: string;
  MessageOrPropertyDetails?: string;
  createdAt: string;
};

interface StaffPrePurchaseProVerProps {
  prePurchaseRequest: PrePurchaseRequest[];
}

const StaffPrePurchaseProVer: React.FC<StaffPrePurchaseProVerProps> = ({
  prePurchaseRequest,
}) => {
  const [searchId, setSearchId] = useState("");

  const filteredRequests = prePurchaseRequest.filter((request) =>
    searchId.trim() === "" ? true : request._id.includes(searchId.trim())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Pre-Purchase Verification Requests</h2>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by Request ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Message/Details</th>
              <th>Requested On</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request._id}>
                <td>{request._id}</td>
                <td>{request.FullName}</td>
                <td>{request.Phone}</td>
                <td>{request.Email}</td>
                <td>{request.Address}</td>
                <td>
                  {request.MessageOrPropertyDetails
                    ? request.MessageOrPropertyDetails
                    : "-"}
                </td>
                <td>
                  {new Date(request.createdAt).toLocaleDateString()} <br />
                  {new Date(request.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPrePurchaseProVer;
