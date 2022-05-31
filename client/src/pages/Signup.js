import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // try {
        //     const { data } = await addUser({
        //         variables: { ...formState },
        //     });

        //     Auth.login(data.addUser.token);
        // } catch (e) {
        //     console.error(e);
        // }
    };

    return (
        <main>
        <div>
            <div className="login-box">
            <div className="row collapse expanded">
            <div className="small-12 medium-6 column small-order-2 medium-order-1">
            <div className="login-box-form-section">
        <h1 className="login-box-title text-center">Sign up</h1>
        <form onSubmit={handleFormSubmit}>
        <input className="login-box-input text-center" 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formState.username} 
            onChange={handleChange}/>
        <input className="login-box-input text-center" 
            type="email" 
            name="email" 
            placeholder="E-mail"
            value={formState.email}
            onChange={handleChange} />
        <input className="login-box-input text-center" 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formState.password}
            onChange={handleChange} />
        <input className="login-box-submit-button" 
            type="submit" 
            name="signup_submit" 
            value="Sign me up" />
        </form>

        {error && <div>Signup failed</div>}
        </div>

    </div>

    </div>
</div>


        </div>
        </main>
    )
}
export default Signup;