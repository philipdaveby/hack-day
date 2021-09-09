import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = async e => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('');
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Sign up</h2>
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
        </div>
    );
}

export default Signup;