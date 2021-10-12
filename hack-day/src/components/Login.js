import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const notify = text => toast(text);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push('/');
        } catch {
            notify('Your email and password does not match, please try again.');
            setLoading(false);
            passwordRef.current.value = '';
        } 
    }

    return (
        <div>
            <h2>Log in</h2>
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
            < ToastContainer />
        </div>
    );
}

export default Login;