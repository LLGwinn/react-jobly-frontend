import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import JoblyApi from './api';
import './CompanyCard.css';

function CompanyCard( {handle}) {
    const [company, setCompany] = useState("");

    useEffect( () => {
        async function getCompanyInfo() {
            try {
                setCompany(await JoblyApi.getCompany(handle));
            } catch(err) {
                console.log(err)
            }
        }
        getCompanyInfo();
    }, [handle]);

    return(
        <Link className='CompanyCard-link' to={`/companies/${company.handle}`}>
            <div className='CompanyCard'>
                <p className='CompanyCard-header'>{company.name}</p>
                <p>{company.description}</p>
            </div>
        </Link>
    )
}

export default CompanyCard;