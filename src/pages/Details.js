// import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { getBlogsDetails } from '../api/Api';
// import Loader from '../Plugin/Loader';
import { useNavigate } from 'react-router-dom';
import { applyCertificate, getCertificatesDetails } from '../api/Api';

function CertificateDetails() {
    const fakeData = [
        { id: 1, name: "Beauty Parlour", email: "john.doe@example.com", age: 28, image: "./images/beauty_parlour.jpg" },
        { id: 2, name: "Beauty Parlour", email: "jane.smith@example.com", age: 34, image: "./images/beautyparlour.webp" },
        { id: 3, name: "Silai Machine", email: "alice.johnson@example.com", age: 25, image: "./images/silai.jpg" },
    ];

    const [show, setShow] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState("");
    const navigate = useNavigate()
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [certificateDetails, setCertificateDetails] = useState()
    const [apply, setApply] = useState()
    const handleSelectChange = (e) => {
        setSelectedMachine(e.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const certificatesDetails = await getCertificatesDetails('details');
                setCertificateDetails(certificatesDetails);
            } catch (error) {
                console.error('Error fetching state data:', error);
            }
        }
        fetchData();
    }, []);


    const handleApply = async () => {
        const formData = new FormData();
        formData.append('api', 'apply');
        // formData.append('slug', slug);
        try {
            const response = await applyCertificate(formData);
            if (response.status === 200) {
                setApply(response.data.data);
            }
            navigate("/mycertificate")
        } catch (error) {
            console.error('Error fetching blog details:', error);
        }
        handleClose();
    }

    return (
        <Container className='my-4'>
            <Col md={5} className='mx-auto'>
                <Card>
                    <div style={{ height: '50%' }}>
                        <Card.Img
                            variant="top"
                            src='./images/beauty_parlour.jpg'
                            alt='beauty_parlour'
                            style={{
                                height: '350px',
                                width: '100%',
                                objectPosition: 'center center',
                                objectFit:'contain'
                            }}
                        />
                    </div>
                    <div className='px-2'>
                        <Card.Body style={{ height: '50%' }}>
                            <Card.Title className='font'>Beauty Parlour</Card.Title>
                            <div>
                                <p>
                                    Confidence boost
                                    A new haircut, manicure, or glowing complexion can make you feel better about yourself.
                                    Stress relief
                                    Beauty salons offer services like massages and spas to help you relax and rejuvenate.
                                    Expert advice
                                    Beauty salons have experienced specialists who can recommend the best treatments for your needs.
                                    Variety of options
                                    Beauty salons offer a range of treatments, including facials, massages, spas, and haircuts.
                                </p>
                            </div>
                        </Card.Body>
                    </div>
                    <div className='text-center mb-3'>
                        <button className='button px-3' onClick={handleShow}>Apply</button>
                    </div>
                    <form>
                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Select Certificate Type</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group controlId="silaiMachineSelect">
                                    <Form.Control as="select" value={selectedMachine} onChange={handleSelectChange}>
                                        <option value="">Select Certificate</option>
                                        <option value="Basic Silai Machine">Basic Silai Machine</option>
                                        <option value="Advanced Silai Machine">Advanced Silai Machine</option>
                                        <option value="Industrial Silai Machine">Industrial Silai Machine</option>
                                    </Form.Control>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleApply} disabled={!selectedMachine}>
                                    Apply
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </Card>
            </Col>
        </Container>
    );
}

export default CertificateDetails;
