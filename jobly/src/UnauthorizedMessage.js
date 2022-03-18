import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './UnauthorizedMessage.css'

function UnauthorizedMessage() {
    return(
        <div className='UnauthorizedMessage'>
            <h2 >Oops... </h2>
            <p>You must be logged in to view this page.</p>
            <div>
                <Link to='/login'><Button variant='primary'>Log In</Button></Link>
                <Link to='/signup'><Button variant='primary'>Sign Up</Button></Link>
            </div>
        </div>
        
    )
}

export default UnauthorizedMessage;