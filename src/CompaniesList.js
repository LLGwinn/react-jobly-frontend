import React, {useEffect, useState, useContext} from "react";
import JoblyApi from './api';
import CompanyCard from "./CompanyCard";
import AuthContext from "./authContext";
import UnauthorizedMessage from './UnauthorizedMessage';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from "./LoadingSpinner";
import './CompaniesList.css';

/** Shows a list of all companies: name, description */

function CompaniesList() {
    const [allCompanies, setAllCompanies] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const {token} = useContext(AuthContext);
    if (!token) return <UnauthorizedMessage />

    // API call to backend to get all companies, set state
    useEffect( () => {
        search("");
    }, []);

    async function search(name) {
        try {
            const searchResults = await JoblyApi.getAllCompanies(name);
            setAllCompanies(searchResults);
        } catch (err) {
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

    if (!allCompanies) return <LoadingSpinner />
    
    return(
        <div>
            <Form className='CompaniesList-form' onSubmit={handleSubmit}>
                <Form.Control type="text" 
                              placeholder="Search by company name" 
                              onChange={handleChange} />
                <Button variant="primary" type='submit'>Search</Button> 
                <Button variant='dark' onClick={reset}>Reset</Button>
            </Form>
            {allCompanies.length > 0 
                ? allCompanies.map(company => <CompanyCard handle={company.handle} key={company.handle}/>)
                : <p>No results found for "{searchTerm}".</p>
            }
        </div>
        
    )
}

export default CompaniesList;