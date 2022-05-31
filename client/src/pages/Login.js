import React from 'react';
const Login = () => {
    return (

    <div className="sign-in-form">
        <h4 className="text-center text-size">Sign In</h4>
        <label for="sign-in-form-username">Username</label>
        <input type="text" className="sign-in-form-username" id="sign-in-form-username" name="username"></input>
        <label for="sign-in-form-password">Password</label>
        <input type="text" className="sign-in-form-password" id="sign-in-form-password"></input>
        <button type="submit" className="sign-in-form-button">Sign In</button>
    </div>
    )  
}

export default Login;