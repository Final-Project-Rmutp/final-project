import React from 'react';
import './Admin.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthLogin';

const Admin: React.FC = () => {
    const { user, logout, getUserInfo } = useAuth();
    const navigate = useNavigate();
    const userInfo = getUserInfo();

    return (
    <div className="admin-container">
        {user && (
        <div className="logout-button" onClick={() => { logout(); navigate('/'); }}>
            <p>Welcome, {userInfo.name}!</p>
        </div>
        )}
        <h1>Welcome to the Admin Panel</h1>
      {/* Add more content as needed */}
    </div>
    );
};

export default Admin;
