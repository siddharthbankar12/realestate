import React from "react";
import styles from "./AdminList.module.css";

interface Admin {
  _id: string;
  adminId: string;
  buyersId?: { name: string; email: string }[];
  sellersId?: { name: string; email: string }[];
}

interface Props {
  admins: Admin[];
  onAddAdminClick: () => void;
  loading: boolean;
  error: string | null;
  handleRemoveAdmin: (id: string) => void;
}

const AdminList: React.FC<Props> = ({
  admins,
  onAddAdminClick,
  loading,
  error,
  handleRemoveAdmin,
}) => {
  return (
    <div className={styles.adminList}>
      <div className={styles.header}>
        <h2>Admins</h2>
        <button onClick={onAddAdminClick}>Add Admin</button>
      </div>
      {loading ? (
        <p>Loading admins...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Admin ID</th>
              <th>Buyers</th>
              <th>Sellers</th>
              <th>Delete Account</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.adminId}</td>
                <td>{admin.buyersId?.length ?? 0}</td>
                <td>{admin.sellersId?.length ?? 0}</td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleRemoveAdmin(admin._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminList;
