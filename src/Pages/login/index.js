import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';

import googleIcon from '../../image/google-icon.png';

const Login = () => {
  const navigate = useNavigate();

  const googleAuth = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/');
  };

  return (
    <div className="login">
      <h1>THIS IS USER LOGIN PAGE</h1>
      <p style={{ color: 'black' }}>Sign In</p>
      <button onClick={googleAuth}>
        <img src={googleIcon} alt="" />
        Google
      </button>
    </div>
  );
};

export default Login;
