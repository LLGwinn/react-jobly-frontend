import React, { useContext } from "react";
import {NavLink} from 'react-router-dom';
import AuthContext from "./authContext";
import './Navbar.css';

function Navbar( {logout} ) {
    const {currUser, token} = useContext(AuthContext);

    function logOut() {
        logout();
    }

    return(
        <nav className='Navbar'>
            <div className='Navbar-brand col-1'>
                <NavLink  exact to='/'>Jobly</NavLink>
            </div>
            <div className='col-6 ms-4 me-3'>
                {token !== '' && <NavLink exact to='/companies'>Companies</NavLink>}
                {token !== '' && <NavLink exact to='/jobs'>Jobs</NavLink>}
            </div>
            <div className='Navbar-right col-4'>
                {currUser
                    ? <NavLink exact to='/profile'>Profile</NavLink>
                    : <NavLink exact to='/login'>Login</NavLink>
                }
                {currUser
                    ? <NavLink exact to='/' onClick={logOut}>Logout {currUser.username}</NavLink>
                    : <NavLink exact to='/signup'>Sign Up</NavLink>
                }
            </div>

        </nav>
    )
}

export default Navbar;
