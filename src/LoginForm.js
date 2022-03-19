import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginForm.css';

function LoginForm( {login} ) {
    const [formData, setFormData] = useState(
        {username: "",
         password: ""}
    );

    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => (
             {...data, [name]:value}
        ))
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        login(formData.username, formData.password)
    }

    return(
        <div className='LoginForm col-sm-8 col-md-6'>
            <h1>Log In</h1>
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
                                  onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm;