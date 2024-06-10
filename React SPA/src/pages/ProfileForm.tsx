import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    contactNumber: Yup.string().required('Required'),
    billingAddress: Yup.string().required('Required'),
    authorizedUsers: Yup.array().of(
        Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
            age: Yup.number().required('Required'),
            relationship: Yup.string().required('Required'),
        }),
    ),
});

const ProfileForm = () => (
    <Formik
        initialValues={{
            name: '',
            email: '',
            contactNumber: '',
            billingAddress: '',
            authorizedUsers: [{ email: '', phone: '', name: '', age: '', relationship: '' }],
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
            axios
                .post('/api/profile', values)
                .then((response) => {
                    console.log('Profile updated', response.data);
                })
                .catch((error) => {
                    console.error('Error updating profile', error);
                });
        }}
    >
        {({ values }) => (
            <Form>
                <div>
                    <label>Name</label>
                    <Field name="name" />
                </div>
                <div>
                    <label>Email</label>
                    <Field name="email" type="email" />
                </div>
                <div>
                    <label>Contact Number</label>
                    <Field name="contactNumber" />
                </div>
                <div>
                    <label>Billing Address</label>
                    <Field name="billingAddress" />
                </div>
                <FieldArray name="authorizedUsers">
                    {({ insert, remove, push }) => (
                        <div>
                            {values.authorizedUsers.length > 0 &&
                                values.authorizedUsers.map((user, index) => (
                                    <div key={index}>
                                        <div>
                                            <label>User Email</label>
                                            <Field name={`authorizedUsers.${index}.email`} type="email" />
                                        </div>
                                        <div>
                                            <label>Phone</label>
                                            <Field name={`authorizedUsers.${index}.phone`} />
                                        </div>
                                        <div>
                                            <label>Name</label>
                                            <Field name={`authorizedUsers.${index}.name`} />
                                        </div>
                                        <div>
                                            <label>Age</label>
                                            <Field name={`authorizedUsers.${index}.age`} type="number" />
                                        </div>
                                        <div>
                                            <label>Relationship</label>
                                            <Field name={`authorizedUsers.${index}.relationship`} />
                                        </div>
                                        <button type="button" onClick={() => remove(index)}>
                                            Remove User
                                        </button>
                                    </div>
                                ))}
                            <button
                                type="button"
                                onClick={() => push({ email: '', phone: '', name: '', age: '', relationship: '' })}
                            >
                                Add User
                            </button>
                        </div>
                    )}
                </FieldArray>
                <button type="submit">Submit</button>
            </Form>
        )}
    </Formik>
);

export default ProfileForm;
