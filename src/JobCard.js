import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import './JobCard.css';
import './formatNumber';
import JoblyApi from './api';
import addCommas from './formatNumber';
import AuthContext from './authContext';

function JobCard(job) {
    const formattedSalary = job.job.salary !== null
        ? addCommas(job.job.salary)
        : null;

    const {currUser, setCurrUser, token} = useContext(AuthContext);

    async function updateUserApps() {
        try {
            const user = await JoblyApi.getUser(currUser.username);
            setCurrUser(user);
        } catch(err) {
            console.log(err)
        }
    }

    async function applyToJob (evt) {
        try {
            evt.preventDefault();
            const jobId = job.job.id;
            const username = currUser.username;
            await JoblyApi.applyToJob(username, jobId, token);
            updateUserApps();  
        } catch (err) {
            alert('You have already applied to that job.');
        }
    }

    return(
        <div className='JobCard'>
            <p className='JobCard-header'>{job.job.title}</p>
            <p>{job.job.companyName}</p>
            <p className='JobCard-small'>Salary: {formattedSalary}<br />
                Equity: {job.job.equity}</p>
            <div className='text-end'>
                {currUser.applications.includes(job.job.id)
                ? <Button variant='danger'  disabled>
                        APPLIED
                  </Button>
                : <Button variant='danger' onClick={applyToJob}>
                APPLY
                  </Button>
                }
            </div>     
        </div>
    )
}

export default JobCard;