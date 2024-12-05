import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../api/Api";
const POSTAL_URL = process.env.REACT_APP_POSTAL_URL;

function Register() {
    const [result, setResult] = useState();
    const data = { name: "", email: "", mobile_no: "", gender: "", pincode: "", taluka: "", district: "", state: "" }
    const [formData, setformData] = useState(data)
    console.log(formData)
    const [pageError, setPageerror] = useState()
    const [getSuccessMessage, setSuccessMessage] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const fetchPincodeDetails = async () => {
        try {
            const response = await fetch(`${POSTAL_URL}${formData.pincode}`);
            const data = await response.json();
            console.log(data)
            if (data[0].Status === "Success") {
                const postOffice = data[0].PostOffice[0];
                setResult({
                    district: postOffice.District,
                    taluka: postOffice.Block,
                    state: postOffice.State,
                });
                setError(null);
            } else {
                setError(response.message);
                setResult(null);
            }
        } catch (err) {
            setError("Error fetching data. Please try again later.");
            setResult(null);
        }
    };
    useEffect(() => {
        if (formData.pincode.length === 6) {
            fetchPincodeDetails()
        }
    }, [formData.pincode.length === 6])

    const handleData = async (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (result) {
            setformData((prevFormData) => ({
                ...prevFormData,
                taluka: result.taluka || "",
                district: result.district || "",
                state: result.state || ""
            }));
        }
    }, [result]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submittedForm = await register(formData);
            if (submittedForm.status === 200) {
                setSuccessMessage(submittedForm)
            } else {
                setError(submittedForm.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className="my-4">
            <Col lg={6} className="mx-auto">
                <Card className="rounded shadow-lg ">
                    <Card.Body>
                        <h1 className="heading-text">REGISTER</h1>
                        <Form onSubmit={handleSubmit}>
                            {error && <p>{error}</p>}
                            <Row className="row-cols-1 row-cols-md-2">
                                <Col>
                                    <Form.Group className="my-3">
                                        <Form.Control name="name" type="text" value={formData.name} onChange={handleData} placeholder="Name" required />
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                        <Form.Control type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleData} placeholder="Mobile No" required />
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                        <Form.Control type="text" name="pincode" value={formData.pincode} onChange={handleData} placeholder="PIN Code" required />
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Control type="text" name="district" value={formData.district} onChange={handleData} placeholder="District" required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="my-3">
                                        <Form.Control type="email" name="email" value={formData.email} onChange={handleData} placeholder="Email address" required />
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                        <Form.Select className="text-muted" name="gender" value={formData.gender} onChange={handleData}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                        <Form.Control type="text" value={formData.taluka} onChange={handleData} name="taluka" placeholder="Taluka" required />
                                    </Form.Group>
                                    <Form.Group className="my-3">
                                        <Form.Control type="text" value={formData.state} onChange={handleData} name="state" placeholder="State" required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <p className='text-danger'>{pageError}</p>
                                <button type="submit" className="button px-3" onClick={handleSubmit}>Submit</button>
                            </div>
                            <div className="d-lg-flex justify-content-end text-end gap-3 mt-2">
                                <span>Already have account ?</span><NavLink className="nav-link text-danger d-inline" to="/login"> Sign Up</NavLink>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    )
}

export default Register;
