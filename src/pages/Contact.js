import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { makeEnquiry } from "../api/Api";
function Contact() {
    const data = { name: "", email: "", mobile_no: "", subject: "", messge:"" }
    const [formData, setformData] = useState(data)
    const [getSuccessMessage , setSuccessMessage] = useState()
    const [error , setError] = useState()
    const handleData = async (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submittedForm = await makeEnquiry(formData);
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
        <Container className="my-3">
            <h2 className='heading-text'>CONTACT US</h2>
            <Row className="font mt-5">
                <Col lg={6} sm={12}>
                    <h4>Location</h4>
                    <p>Narhe </p>
                    <h4>Factory:</h4>
                    <p>Shree shiv Apartment, Khedekar industrial estate, Near Canara Bank Narhe, Pune-411041.</p>
                    <h4>Email</h4>
                    <p><a href="mailto:info@certificate.com" className="email-link">info@certificate.com</a></p>
                    <h4>Call</h4>
                    <p><a href="tel:+91999999999" className="phone-link">+91 999999999</a></p>
                </Col>

                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="my-3">
                            <Form.Control type="text" name="name" value={formData.name} placeholder="Your Name" required onChange={handleData}/>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Control type="tel" name="mobile_no" value={formData.mobile_no} placeholder="Your Number" required onChange={handleData}/>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Control type="email" name="email" value={formData.email} placeholder="Your Email" required onChange={handleData}/>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Control placeholder="Subject" name="subject" value={formData.subject} type="text" required onChange={handleData}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <textarea className="form-control" name="message" rows="2" value={formData.message} placeholder="Message" required onChange={handleData}></textarea>
                        </Form.Group>
                        <Form.Group className='text-center mt-0'>
                            <button type="submit" className="button px-3">Send Message</button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact