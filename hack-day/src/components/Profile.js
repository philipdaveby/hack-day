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
        <div className="profile">
            <section className="profile__card">
                <h2 className="h2">Your Profile</h2>
                <ul className="profile_list">
                {currentUser && <p>Email: {currentUser.email}</p>}
                </ul>
                {error && <p className="profile__error">{error}</p>}
                <div className="profile__buttons">
                    {/* <a href="/update-profile">Update Profile</a> */}
                    <button className="profile__logout-button" onClick={() => history.push('/update-profile')}>Update Profile</button>
                    <button className="profile__logout-button" onClick={handleLogout}>Log out</button>
                </div>
            </section>
        </div>
    )
}

export default Profile;
