import Navbar from '../components/Navbar';
import '../UserManagementPage.css';

const UserManagementPage = () => {
  return (
    <>
      <Navbar />
      <div className="user-management-container">
        <h2>User Management</h2>
        <form className="user-management-form">
          <label>
            Full Name
            <input type="text" placeholder="Enter full name" required />
          </label>

          <label>
            Email
            <input type="email" placeholder="Enter email" required />
          </label>

          <label>
            Role
            <select>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </label>

          <label>
            Status
            <select>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </label>

          <label className="span-2">
            Notes
            <textarea placeholder="Add notes about the user"></textarea>
          </label>

          <button type="submit">Save User</button>
        </form>
      </div>
    </>
  );
};

export default UserManagementPage;
