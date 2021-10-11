import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const notify = text => toast(text);

    const testPassword = password => {
        if (password.length < 8) {
            return notify('Your password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            return notify('Your password must include at least one upper case letter')
        }
        if (!/[a-z]/.test(password)) {
            return notify('Your password must include at least one lower case letter')
        }
        if (!/\d/.test(password)) {
            return notify('Your password must include at least one number')
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (testPassword(passwordRef.current.value)) {
            return;
        }

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            passwordRef.current.value = '';
            passwordConfirmationRef.current.value = '';
            return notify('Passwords do not match, try again please.');
        }
        
        try {
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                passwordRef.current.value = '';
                passwordConfirmationRef.current.value = '';
                return notify(error.message);
            }
            notify('Failed to create an account, try again please.');
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Sign up</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    className="form__input"
                    type="email"
                    ref={emailRef}
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                />
                <input
                    className="form__input"
                    type="password"
                    ref={passwordRef}
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                />
                <input
                    className="form__input"
                    type="password"
                    ref={passwordConfirmationRef}
                    name="password-confirmation"
                    id="password-confirmation"
                    placeholder="Password confirmation"
                    required
                />
                <input disabled={loading} type="submit" value="Sign In" />
            </form>
            Already have an account? <Link to="/login">Log in</Link>
            <ToastContainer />
        </div>
    );
}

export default Signup;