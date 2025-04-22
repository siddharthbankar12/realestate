import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Modal.module.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

const Modal = (props: ModalProps) => {
  const [AddAdmin, setAddAdmin] = React.useState({
    adminId: "",
    password: "",
  });
  const baseUrl = "http://localhost:8000/api/admin/signup";
  const onSubmit = async (e: React.FormEvent) => {
    setAddAdmin({ adminId: "", password: "" });
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl, AddAdmin);

      // const token = response.data.token;
      // console.log(token);
      const token = localStorage.getItem("authToken");
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
      // localStorage.setItem('authToken', token);
      // toast.success("Admin added successfully");
      return response.data;
    } catch (error) {
      console.error("Adding Admin failed", error);
      throw new Error("Adding Admin failed");
    }
  };
  const handle = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAddAdmin({ ...AddAdmin, [e.currentTarget.name]: e.currentTarget.value });
  };
  const handleclose = () => {
    if (AddAdmin.adminId === "" || AddAdmin.password === "") {
      toast.error("Please fill all fields");
    } else {
      toast.success("Admin added successfully");
      props.handleClose();
    }
  };
  return (
    <div className={`${styles.modal} ${props.show ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.modalclose} onClick={props.handleClose}>
          &times;
        </span>
        <h3>Enter Admin Details</h3> <br />
        <form className={styles.modalform} onSubmit={onSubmit}>
          <label htmlFor="adminId" className={styles.modallabel}>
            Admin ID:
          </label>
          <input
            type="text"
            id="adminId"
            name="adminId"
            required
            className={styles.modalinput}
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
            className={styles.modalinput}
            value={AddAdmin.password}
            onChange={handle}
          />

          <button
            type="submit"
            className={styles.modalbutton}
            onClick={handleclose}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
