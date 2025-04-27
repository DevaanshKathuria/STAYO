import React from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

function Settings() {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>Account Settings</h1>
        <section className="settings-section">
          <h2>Profile Information</h2>
          <div className="settings-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" defaultValue={user.name} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={user.email} readOnly />
            </div>
          </div>
        </section>

        <div className="settings-actions">
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
