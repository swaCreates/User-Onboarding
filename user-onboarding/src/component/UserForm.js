import React, {useState, useEffect} from 'react'
import { withFormik, Form, Field } from 'formik';
import {Button} from 'reactstrap';
import axios from 'axios';
import * as Yup from "yup";

// props from Formik => values, errors, touched, status
// these are prefixed props sent from Formik into AnimalForm because AnimalForm is wrapped by withFormik HOC
// values => state of inputs & updates with change in input
// errors => any errors from Yup validation
// touched => when an input has be entered and moved away from by user
// status => when change from API has updated via setStatus

function UserForm({values, errors, touched, status}) {

    // local state that holds successful form submission data

    const [info, setInfo]= useState([]);

    // listens for status changes to update info state

    useEffect(() => {
        status && setInfo(info => [...info, status]);
    }, [status]);

    // NAME PROPERTY IN FORM
    // name is the key within values (the current state of the form inputs)

    // Form automatically applies handleSubmit from withFormik options declared below

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

                    {touched.firstname && errors.firstname && (
                    <p className="errors">{errors.firstname}</p>
                    )}

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

                    {touched.lastname && errors.lastname && (
                    <p className="errors">{errors.lastname}</p>
                    )}

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

                    {touched.email && errors.email && (
                    <p className="errors">{errors.email}</p>
                    )}

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

                    {touched.password && errors.password && (
                    <p className="errors">{errors.password}</p>
                    )}

                </label>

                <h2>Terms Of Agreement</h2>
                <p>You must adhere to all terms on this form.</p>
                <label className='agreement' htmlFor='agreement'>
                    Agree to Terms

                    <Field 
                    className='check-box'
                    id="agreement"
                    checked={values.agreement}
                    type="checkbox"
                    name="agreement"
                    />

                    <span className="checkmark" />

                    {/* {touched.agreement && errors.agreement && (
                    <p className="errors">{errors.agreement}</p>
                    )} */}

                </label>

                <div className='btn'>
                    <Button type='submit'>Submit</Button>
                </div>

            </Form>

            {info.map(userInfo => {
                return (
                    <ul key={userInfo.id}>
                        <li>First Name: {userInfo.firstname}</li>
                        <li>Last Name: {userInfo.lastname}</li>
                        <li>Email Address: {userInfo.email}</li>
                    </ul>
                );
            })}

        </div>
    )
}

const FormikForm= withFormik({mapPropsToValues(props){
        return{
            firstname: props.firstname || '',
            middlename: props.middleName || '',
            lastname: props.lastname || '',
            email: props.email || '',
            password: props.password || '',
            agreement: props.agreement || '',
        }
    },

    // passing a string in required makes a custom inline error msg
    // Declare shape and requirement of values object (form state )
    validationSchema: Yup.object().shape({
        firstname: Yup.string().required('Please enter your first name'),
        lastname: Yup.string().required("Please enter your last name"),
        email: Yup.string().required('Please enter your email'),
        password: Yup.string().required('Please create a password'),
        agreement: Yup.boolean(),
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log('Submitting form:', values);
    
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                console.log("Success:", res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => {
                console.log('Error:', err.response);
            });
    }

})(UserForm);

export default FormikForm;
