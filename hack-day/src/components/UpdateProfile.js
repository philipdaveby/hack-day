import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const UpdateProfile = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = async e => {
        e.preventDefault();
        const promises = [];

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('Passwords do not match');
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        setLoading(true);
        setError('');
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history.push('/profile');
            })
            .catch(() => {
                setError('Failed to update account');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="update-profile">
            <h2 className="h2">Update profile</h2>
            {error && <h1 className="error-text">The error: {error}</h1>}
            <form className="update-profile__form" onSubmit={e => handleSubmit(e)}>
                <input
                    className="update-profile__input"
                    type="email"
                    ref={emailRef}
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    defaultValue={currentUser.email}
                />
                <input
                    className="update-profile__input"
                    type="password"
                    ref={passwordRef}
                    name="password"
                    id="password"
                    placeholder="Leave blank to keep the same"
                />
                <input
                    className="update-profile__input"
                    type="password"
                    ref={passwordConfirmationRef}
                    name="password-confirmation"
                    id="password-confirmation"
                    placeholder="Leave blank to keep the same"
                />
                <div className="update-profile__buttons">
                <button className="update-profile__button" disabled={loading} type="submit">Update</button>
                <button className="update-profile__cancel" onClick={() => history.push('/')}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfile;