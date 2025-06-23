import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateContractorForm from "./UpdateContractorForm";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

const UpdateContractorPage: React.FC = () => {
  const { id } = useParams();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    if (!isAdmin) {
      toast.error("Unauthorized access");
      navigate(-1);
      return;
    }

    fetch(`http://localhost:8000/api/contractor/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setContractor(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate(-1);
      });
  }, [id, isAdmin, navigate]);

  const handleUpdated = (updatedContractor: any) => {
    navigate(`/services/contractors/${updatedContractor._id}`);
  };

  if (!isAdmin) return null;

  return (
    <>
      <Navbar />
      <div style={{ height: '50px' }}></div>
      {loading ? (
        <p style={{ padding: "2rem", textAlign: "center" }}>Loading contractor...</p>
      ) : contractor ? (
        <UpdateContractorForm contractor={contractor} onContractorUpdated={handleUpdated} />
      ) : (
        <p style={{ padding: "2rem", textAlign: "center" }}>Contractor not found.</p>
      )}
      <Footer />
    </>
  );
};

export default UpdateContractorPage;
