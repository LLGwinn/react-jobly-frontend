import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SignupForm.css';

function SignupForm( {signup} ) {
    const INITIAL_STATE={username:'', password:'', fname:'',
                            lname:'', email:''};
    const [formData, setFormData] = useState(INITIAL_STATE);

    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => (
             {...data, [name]:value}
        ))
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const newUser = {username:formData.username, 
                         password:formData.password, 
                         firstName:formData.fname, 
                         lastName:formData.lname, 
                         email:formData.email}
        signup(newUser);
    }

    return(
        <div className='SignupForm col-sm-8 col-md-6'>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text'
                                  value={formData.username}
                                  name='username'
                                  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                                  value={formData.password}
                                  name='password'
                                  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type='text'
                                  value={formData.fname}
                                  name='fname'
                                  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type='text'
                                  value={formData.lname}
                                  name='lname'
                                  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email'
                                  value={formData.email}
                                  name='email'
                                  onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignupForm;