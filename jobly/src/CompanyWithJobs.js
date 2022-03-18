import React, {useEffect, useState, useContext} from "react";
import {useParams} from 'react-router-dom';
import JoblyApi from "./api";
import JobCard from "./JobCard";
import AuthContext from "./authContext";
import UnauthorizedMessage from "./UnauthorizedMessage";
import './CompanyWithJobs.css';

function CompanyWithJobs() {
    const {handle} = useParams();
    const [company, setCompany] = useState("");

    const {token} = useContext(AuthContext);
    if (!token) return <UnauthorizedMessage />;

    useEffect(() => {
        async function getCompanyInfo() { 
            try {
                setCompany(await JoblyApi.getCompany(handle));
            } catch(err) {
                console.log(err)
            }
        }
        getCompanyInfo();
    }, [handle])

    return(
        <div className="CompanyWithJobs">
           <p className="CompanyWithJobs-header">{company.name}</p>
           <p>{company.description}</p>
           {company.jobs ?
                <ul>
                    {company.jobs.map(job => <li key={job.id}><JobCard job={job} /></li>)}
                </ul> :
                null
            }
        </div>  
    )
}

export default CompanyWithJobs;