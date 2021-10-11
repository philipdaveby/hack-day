import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {

    // const emailRef = useRef(null);
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);
    const { currentUser, updatePassword, login } = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const notify = text => toast(text);


    const handleSubmit = async e => {
        e.preventDefault();
        const promises = [];
        setLoading(true);

        if (newPasswordRef.current.value !== passwordConfirmationRef.current.value) {
            notify('Your new passwords does not match, please try again');
            passwordConfirmationRef.current.value = '';
            return oldPasswordRef.current.value = '';
        }
        
        try {
            setLoading(true)
            await login(currentUser.email, oldPasswordRef.current.value);

        } catch {
            notify('Your old password is not correct, please try again');
            return oldPasswordRef.current.value = '';
        }

        try {
            setLoading(true)
            await promises.push(updatePassword(newPasswordRef.current.value));
            notify('Your password has been updated')

        } catch {
            notify('Your password could not be updated, please try again');
            newPasswordRef.current.value = '';
            passwordConfirmationRef.current.value = '';
        }

        // if (emailRef.current.value !== currentUser.email) {
        //     promises.push(updateEmail(emailRef.current.value));
        //     notify('Your email has been updated');
        // }

        Promise.all(promises)
            .then(() => {
                setTimeout(() => {
                    history.push('/profile');
                }, 1500);
            })
            .catch(() => {
                notify('Failed to update account, please try again');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="update-profile">
            <h2 className="h2">Update your email or password</h2>
            <form className="update-profile__form" onSubmit={e => handleSubmit(e)}>
            {/* <p>Email</p>
                <input
                    className="update-profile__input"
                    type="email"
                    ref={emailRef}
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    defaultValue={currentUser.email}
                /> */}
                <input
                    className="update-profile__input"
                    type="password"
                    ref={oldPasswordRef}
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Old password"
                />
                <input
                    className="update-profile__input"
                    type="password"
                    ref={newPasswordRef}
                    name="newPassword"
                    id="newPassword"
                    placeholder="New password"
                />
                <input
                    className="update-profile__input"
                    type="password"
                    ref={passwordConfirmationRef}
                    name="password-confirmation"
                    id="password-confirmation"
                    placeholder="Confirm password"
                />
                <div className="update-profile__buttons">
                <button className="update-profile__button" disabled={loading} type="submit">Update</button>
                <button className="update-profile__cancel" onClick={() => history.push('/')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateProfile;