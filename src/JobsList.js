import React, {useEffect, useState, useContext} from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import AuthContext from "./authContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './JobsList.css';
import LoadingSpinner from './LoadingSpinner';
import UnauthorizedMessage from "./UnauthorizedMessage";

function JobsList() {
    const [jobs, setJobs] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const {token} = useContext(AuthContext);
    if (!token) return <UnauthorizedMessage />

    useEffect( () => {
        search("");
    }, []);

    async function search(title) {
        try {
            const searchResults = await JoblyApi.getAllJobs(title);
            setJobs(searchResults);
        } catch(err) {
            console.log(err)
        }
    }

    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        search(searchTerm);
    }

    function reset(evt) {
        document.getElementsByTagName('input')[0].value = "";
        search("");
    }
    
    if (!jobs) return <LoadingSpinner />
    
    return(
        <div>
            <Form className='JobsList-form' onSubmit={handleSubmit}>
                <Form.Control type="text"
                                placeholder="Search by job title" 
                                onChange={handleChange} />
                <Button variant="primary" type='submit'>Search</Button> 
                <Button variant='dark' onClick={reset}>Reset</Button>
            </Form>
            {jobs.length > 0 
                ? jobs.map(job => <JobCard job={job} key={job.id}/>)
                : <p className='JobsList-notfound'>No results found for "{searchTerm}".</p>
            }
        </div>
    )
    
}

export default JobsList;