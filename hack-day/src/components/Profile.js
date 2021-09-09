import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Profile = () => {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

  if (!currentUser) {
    history.push('/login');
  }

    const handleLogout = async () => {
        setError('')

        try {
            await logout();
            history.pushState('/login');
        } catch {
            setError('Failed to log out');
        }
    }
    

    return (
        <div>
            <h2>Profile</h2>
            {currentUser && <p>Email: {currentUser.email}</p>}
            <Link to='/update-profile'>Update Profile</Link>
            {error && <p>{error}</p>}
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Profile;
