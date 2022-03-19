import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from './authContext';
import './Home.css';
import Button from 'react-bootstrap/Button';

function Home() {
    const {currUser} = useContext(AuthContext);
    return (
        <div className='Home'> 
            <p className='Home-title'>Jobly</p>
            <p className='Home-message'>All the jobs in one convenient place.</p>
            {currUser
            ? <p className='Home-welcome'>Welcome, {currUser.firstName}!</p>
            : <div>
                <Link to='/login'><Button variant='primary'>Log In</Button></Link>
                <Link to='/signup'><Button variant='primary'>Sign Up</Button></Link>
              </div>
            }
            
        </div>
    )
}

export default Home;