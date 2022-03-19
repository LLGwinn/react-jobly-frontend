import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingSpinner.css';

function LoadingSpinner() {
    return(
        <div className='LoadingSpinner'>
            <Spinner animation="border" role="status" variant='primary'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span>  Loading...</span>
        </div>
    )
}

export default LoadingSpinner;