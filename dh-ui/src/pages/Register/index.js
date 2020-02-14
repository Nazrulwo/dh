import React from "react";
import { withFormik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { string, object } from "yup";
import axios from "axios";
import { compose } from "redux";
import "./register.css";
import { successToast, errorToast } from "../../utils/toast";
import history from "../../history";

export function Register({ dispatch, values, touched, errors, handleChange, handleBlur, isSubmitting }) {
    return (
        <div className="register--formContainer">
            <Typography variant="h3">Registration</Typography>

            <Form>
                <TextField
                    id="username"
                    label="Email"
                    variant="outlined"
                    required
                    value={values.username || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && errors.username}
                    helperText={touched.username && errors.username}
                />

                <TextField
                    id="password"
                    label="password"
                    variant="outlined"
                    type="password"
                    required
                    value={values.password || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                    helperText={touched.password && errors.password}
                />

                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    required
                    value={values.confirmPassword || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                />

                {/* Submit button */}
                <Button variant="contained" color="primary" size="large" type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

const withConnect = connect(null, mapDispatchToProps);

// Form handling with formik
const Formik = withFormik({
    validationSchema: object().shape({
        username: string()
            .trim()
            .email("Invalid Email address.")
            .required("Username is required"),
        password: string()
            .trim()
            .required("Password is required"),
        confirmPassword: string()
            .trim()
            .required("Confirm Password is required")
            .test("confirmPass", "Confirm Password is not same as Password", function(value) {
                return value != this.parent.password ? false : true;
            })
    }),

    handleSubmit: (values, { setSubmitting, resetForm, setFieldValue }) => {
        axios
            .post("/auth/register", {
                username: values.username,
                password: values.password
            })
            .then(
                () => {
                    resetForm();
                    setSubmitting(false);
                    successToast("New user registered successfully");
                    history.push("");
                },
                function onRejected(err) {
                    console.log(err.response);
                    setSubmitting(false);

                    if (err.response && err.response.data.errors) {
                        errorToast(err.response.data.errors[0].message);
                    } else {
                        errorToast("Error occurred !!");
                    }
                }
            );
    }
})(compose(withConnect)(Register));

export default Formik;
