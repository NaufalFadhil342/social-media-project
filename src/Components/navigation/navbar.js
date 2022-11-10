import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="navbar">
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        {!user ? (
          <NavLink to="login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
        ) : (
          <NavLink to="post" className={({ isActive }) => (isActive ? 'active' : '')}>
            Create Post
          </NavLink>
        )}
      </nav>
      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ''} alt="" width="30" height="30" />
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
