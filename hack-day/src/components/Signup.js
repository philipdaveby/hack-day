import React from "react";

const Signup = () => {
    return (
        <div>
            <h2>Sign up</h2>
            <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
            </form>
            Already have an account? Log in
        </div>
    );
}

export default Signup;