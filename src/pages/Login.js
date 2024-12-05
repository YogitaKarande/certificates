import { useState } from "react";
import { Card, Col, Container, Form } from "react-bootstrap";
import { FaMobileAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../api/Api";

function Login() {
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState();
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
        if (formValues?.email) {
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
        if (formValues) {
            const submittedForm = await login(formValues);
            console.log(submittedForm)
            if (submittedForm.status === 200) {
                navigate('/')
            } else {
                setError(submittedForm.message)
            }
        }
    }

    return (
        <Container >
            <Col lg={5} className="mx-auto">
                <Card className="shadow-lg py-3">
                    <Form className="p-4 mx-lg-4" onSubmit={handleSubmit}>
                        <h1 className='heading-text'>LOGIN</h1>
                        <Form.Group className="mb-1 pt-4">
                            <Col className="input-group d-flex">
                                <span className="input-group-text">
                                    <FaMobileAlt />
                                </span>
                                <Form.Control name="email" type="text" value={formValues.email} onChange={handleChange} placeholder="Email" />
                            </Col>
                            {emailError && (
                                <p className="text-danger mt-1">{emailError}</p>
                            )}
                            <div className="input-group d-flex mt-4">
                                <span className="input-group-text">
                                    <RiLockPasswordFill />
                                </span>
                                <Form.Control name="password" type="password" value={formValues.password} onChange={handleChange} placeholder="Password" />
                            </div>
                        </Form.Group>
                        <div className="mt-3 text-center">
                            {error && <p className="text-danger">{error}</p>}
                            <button className="button px-3" onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Sending...' : 'Login'}
                            </button>
                        </div>
                        <div className="d-lg-flex justify-content-end text-end gap-3 mt-2">
                            <span>Don't have account ?</span><NavLink className="nav-link text-primary d-inline" to="/register"> Sign Up</NavLink>
                            <NavLink className='nav-link text-danger' to="/forget">Forget Password ? </NavLink>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Container>
    )
}
export default Login;
