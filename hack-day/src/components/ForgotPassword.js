import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

    const emailRef = useRef(null);
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setMessage('')
            setError('');
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password');
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            {error && <h1 className="error-text">The error: {error}</h1>}
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
                <input disabled={loading} type="submit" value="Reset Password" />
            </form>
            {message && <p>{message}</p>}
            <div>
                <Link to="/login">Login</Link>
            </div>
            Need an account? <Link to="/signup">Sign up</Link>
        </div>
    );
}

export default ForgotPassword;
