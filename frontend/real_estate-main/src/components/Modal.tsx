import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Modal.module.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const Modal = ({ show, handleClose }: ModalProps) => {
  const [AddAdmin, setAddAdmin] = React.useState({ adminId: "", password: "" });
  const baseUrl = "http://localhost:8000/api/admin/signup";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the token from local storage or wherever it's stored
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("You must be logged in to add an admin.");
      return;
    }

    try {
      const response = await axios.post(baseUrl, AddAdmin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Admin added successfully");
      window.location.reload();

      handleClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Adding Admin failed";
      toast.error(errorMessage);
    }
  };

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddAdmin({ ...AddAdmin, [e.target.name]: e.target.value });
  };

  return (
    <div className={`${styles.modal} ${show ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.modalclose} onClick={handleClose}>
          &times;
        </span>
        <h3>Enter Admin Details</h3>
        <form className={styles.modalform} onSubmit={onSubmit}>
          <label htmlFor="adminId" className={styles.modallabel}>
            Admin ID:
          </label>
          <input
            type="text"
            id="adminId"
            name="adminId"
            required
            value={AddAdmin.adminId}
            onChange={handle}
          />
          <label htmlFor="password" className={styles.modallabel}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={AddAdmin.password}
            onChange={handle}
          />
          <button type="submit" className={styles.modalbutton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
