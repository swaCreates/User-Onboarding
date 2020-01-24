import React, {useState, useEffect} from 'react'
import { withFormik, Form, Field } from 'formik';
import {Button} from 'reactstrap';
import axios from 'axios';

function UserForm() {
    return (
        <div className='container'>
            <Form>
                <h2>Name</h2>
                <label htmlFor='firstname'>
                    First *

                    <Field 
                    className='input'
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder='first name'
                    />
                </label>
                <label htmlFor='middlename'>
                    Middle

                    <Field 
                    className='input'
                    id="middlename"
                    type="text"
                    name="middlename"
                    placeholder="middle name"
                    />
                </label>
                <label htmlFor='lastname'>
                    Last *

                    <Field 
                    className='input'
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder="last name"
                    />
                </label>
                <label className='email' htmlFor='email'>
                    Email *

                    <Field 
                    className='input'
                    id="email"
                    type="text"
                    name="email"
                    placeholder="example@email.com"
                    />
                </label>
                <h2>Password</h2>
                <label className='password' htmlFor='password'>
                    Create a password *

                    <Field 
                    className='input'
                    id="password"
                    type="text"
                    name="password"
                    placeholder='enter password'
                    />
                </label>
                <h2>Terms Of Agreement</h2>
                <p>You must adhere to all terms on this form.</p>
                <label className='agreement' htmlFor='agreement'>
                    Terms of Service

                    <Field 
                    className='check-box'
                    id="agreement"
                    type="checkbox"
                    name="agreement"
                    />
                </label>
                <div className='btn'>
                    <Button>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

const FormikForm= withFormik({})(UserForm);

export default FormikForm;
