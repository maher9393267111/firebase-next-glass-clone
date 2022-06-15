import { useRadio } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../context/global';

const Login = () => {
    const {   signInWithGithub,  signInWithGoogle,userinfo,logout } = useAuth();


    return (
        <div>
            <h1>Login</h1>
            <div
            onClick={  signInWithGoogle }
            >sign with facebook</div>

            <div
            className=''
            onClick={  logout }
            >signout</div>

{userinfo?.email}


        </div>
    );
}

export default Login;
