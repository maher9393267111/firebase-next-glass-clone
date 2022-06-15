import { useState } from 'react';
import {  sendPasswordResetEmail } from "firebase/auth";

import {auth} from "../firebase";
const ForgotPasswordModal = () => {

    const [ email, setEmail ] = useState(null);

    

   // submit function
   const handleSubmit = async e => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      alert('Password Reset Link Sent.')
    } catch (err) {
      alert('Password bNOOOOOt Reset Link Sent.')
    }
  }


    return (
        <form onSubmit={handleSubmit} > 
        {email}
            <input 
                required 
                type='email'
                placeholder='Email'
                onChange={e => {
                    setEmail(e.target.value);
                }}
                style={{width: '50%'}}
            />
            <input 
                type='submit'
                value=''
                style={{backgroundColor: 'white',
                    cursor: 'pointer'
                }}
            />
            <button type='submit'>send password</button>
        </form>
    )

}

export default ForgotPasswordModal;