import React from 'react';
import { useAuth } from '../../context/global';

const Login = () => {
    const {   signInWithGithub,  signInWithGoogle } = useAuth();


    return (
        <div>
            <h1>Login</h1>
            <div
            onClick={  signInWithGithub }
            >sign with facebook</div>
        </div>
    );
}

export default Login;
