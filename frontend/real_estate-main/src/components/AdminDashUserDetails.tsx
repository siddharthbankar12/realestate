import axios from "axios";
import { useEffect, useState } from "react";

interface AdminProfileProps {
  adminProfile: {
    adminId: string;
    email: string;
    fullName: string;
    phoneNumber: number;
  };
}

interface User {
  _id: string;
  firstName: string;
}

const AdminDashUserDetails: React.FC<AdminProfileProps> = ({
  adminProfile,
}) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/admin/users-details?adminId=${adminProfile.adminId}`
        );
        setUsers(response.data);
      } catch (err: any) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [adminProfile.adminId]);

  console.log(users);

  return (
    <div>
      <h2>Users Details</h2>

      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}

      {users && (
        <div>
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.firstName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashUserDetails;
