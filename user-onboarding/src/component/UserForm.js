import React, {useState, useEffect} from 'react'
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';

function UserForm() {
    return (
        <div className='container'>
            <Form>
                <label htmlFor='name'>
                    Enter your name

                    <Field 
                    id="name"
                    type="text"
                    name="name"
                    placeholder="name"
                    />
                </label>
            </Form>
        </div>
    )
}

const FormikForm= withFormik({})(UserForm);

export default FormikForm;
