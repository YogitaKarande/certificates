import { useEffect, useState } from "react";
import { Card, Col, Container, Form } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/Api";

function ChangePassword() {
    const [formValues, setFormValues] = useState({ oldpassword: "", newpassword: "", confirmpassword: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passData, setPassData] = useState()
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submittedForm = await changePassword(formValues);
            if (submittedForm.status === 200) {
                setPassData(submittedForm)
                navigate('/')
            } else {
                setError(submittedForm.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (formValues.newpassword !== formValues.confirmpassword && formValues.confirmpassword) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    }, [formValues])

    return (
        <Container>
            <Col lg={5} className="mx-auto">
                <Card className="shadow-lg py-2">
                    <Form onSubmit={handleSubmit} className="p-4">
                        <h1 className='heading-text text-muted'>change password</h1>
                        <Form.Group className="mb-1">
                            <div className="input-group d-flex mt-4">
                                <span className="input-group-text">
                                    <RiLockPasswordFill />
                                </span>
                                <Form.Control name="olpassword" type="password" value={formValues.oldpassword} onChange={handleChange} placeholder="Old Password" />
                            </div>
                            <div className="input-group d-flex mt-4">
                                <span className="input-group-text">
                                    <RiLockPasswordFill />
                                </span>
                                <Form.Control name="newpassword" type="password" value={formValues.newpassword} onChange={handleChange} placeholder="New Password" />
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
                    </Form>
                </Card>
            </Col>
        </Container>
    )
}
export default ChangePassword;
