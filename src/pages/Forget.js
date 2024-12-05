import { useEffect, useState } from "react";
import { Card, Col, Container, Form } from "react-bootstrap";
import { FaMobileAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/Api";

function Forget() {
    const [email, setEmail] = useState({ email: "" });
    const [formValues, setFormValues] = useState({ otp: "", password: "", confirmpassword: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mobileError, setMobileError] = useState('');
    const [forgetPassword, getForgetPassword] = useState()
    const [emailError, setEmailError] = useState()
    const [forgetData, setForgetData] = useState()
    const [resetData, setResetData] = useState()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmail(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
        if (email) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(value)) {
                setEmailError("Please enter a valid email address");
            } else {
                setEmailError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submittedForm = await forgetPassword(email);
            if (submittedForm.status === 200) {
                setForgetData(submittedForm)
                navigate('/')
            } else {
                setError(submittedForm.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        try {
            const submittedForm = await resetPassword(formValues);
            if (submittedForm.status === 200) {
                setResetData(submittedForm)
                navigate('/')
            } else {
                setError(submittedForm.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (formValues.password !== formValues.confirmpassword && formValues.confirmpassword) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    }, [formValues])

    return (
        <Container>
            <Col lg={5} className="mx-auto">
                <Card className="shadow-lg py-3">
                    <div className="p-4">
                        {
                            !forgetPassword ? (
                                <Form onSubmit={handleSubmit} className="mx-lg-4">
                                    <h1 className='heading-text'>FORGET PASSWORD</h1>
                                    <Form.Group className="mb-1 pt-4">
                                        <div className="input-group d-flex">
                                            <span className="input-group-text">
                                                <FaMobileAlt />
                                            </span>
                                            <Form.Control name="email" type="email" value={formValues.email} onChange={handleEmailChange} placeholder="Email" />
                                        </div>
                                    </Form.Group>
                                    {
                                        emailError && (<p className="text-danger mt-1">{emailError}</p>)
                                    }
                                    <div className="mt-4 text-center">
                                        <button className="button px-3" onClick={handleSubmit} disabled={loading}>
                                            {loading ? 'Sending...' : 'Submit'}
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-end mt-2">
                                        <span className="me-2">Remember Your Password ? </span><NavLink className="nav-link text-primary d-inline" to="/login">Sign In</NavLink>
                                    </div>
                                </Form>
                            ) : (
                                <>
                                    <Form onSubmit={handleResetSubmit}>
                                        <Col className="mx-lg-4">
                                            <h1 className='heading-text'>reset password</h1>
                                            <Form.Group className="mb-1">
                                                <div className="input-group d-flex mt-4">
                                                    <span className="input-group-text">
                                                        <RiLockPasswordFill />
                                                    </span>
                                                    <Form.Control name="otp" type="otp" value={formValues.otp} onChange={handleChange} placeholder="OTP" />
                                                </div>
                                                <div className="input-group d-flex mt-4">
                                                    <span className="input-group-text">
                                                        <RiLockPasswordFill />
                                                    </span>
                                                    <Form.Control name="password" type="password" value={formValues.password} onChange={handleChange} placeholder="New Password" />
                                                </div>
                                                <div className="input-group d-flex mt-4">
                                                    <span className="input-group-text">
                                                        <RiLockPasswordFill />
                                                    </span>
                                                    <Form.Control name="confirmpassword" type="text" value={formValues.confirmpassword} onChange={handleChange} placeholder="Confirm Password" />
                                                </div>
                                            </Form.Group>
                                            {error && <p className="text-danger">{error}</p>}
                                            <div className="mt-4 text-center">
                                                <button className="button px-3" onClick={handleSubmit} disabled={loading}>
                                                    {loading ? 'Sending...' : 'Reset Password'}
                                                </button>
                                            </div>
                                        </Col>
                                    </Form>
                                </>)
                        }
                    </div>
                </Card>
            </Col>
        </Container>
    )
}
export default Forget;
