import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to sign in');
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Log in</h2>
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
                <input disabled={loading} type="submit" value="Log In" />
            </form>
            <div>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            Need an account? <Link to="/signup">Sign up</Link>
        </div>
    );
}

export default Login;