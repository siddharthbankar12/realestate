import React from "react";
import VerifyPropertiesForm from "../components/VerifyForm";

interface Property {
  _id: string;
  firstName: string;
  phoneNumber: string;
  email: string;
}

interface AdminPropertyVerificationProps {
  properties: Property[];
  loading: boolean;
  error: string | null;
  handleAcceptProperty: (id: string) => void;
  handleRejectProperty: (id: string) => void;
}

const AdminPropertyVerification: React.FC<AdminPropertyVerificationProps> = ({
  properties,
  loading,
  error,
  handleAcceptProperty,
  handleRejectProperty,
}) => {
  return (
    <div>
      {loading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <VerifyPropertiesForm
          properties={properties}
          onAccept={handleAcceptProperty}
          onReject={handleRejectProperty}
        />
      )}
    </div>
  );
};

export default AdminPropertyVerification;
