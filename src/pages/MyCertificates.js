import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCertificates } from '../api/Api';

function MyCertificates() {
  const [show, setShow] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState("");
  const navigate = useNavigate()
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [status, setStatus] = useState('pending')
  const [myCertificates, setMyCertificates] = useState()
  const handleSelectChange = (e) => {
    setSelectedMachine(e.target.value);
  };

  const handleApply = () => {
    // call slelect API here
    const formData = new FormData();
    formData.append('api', 'get-blog-details');
    // formData.append('slug', slug);
    try {
      // const response = await getBlogsDetails(formData);
      // if (response.status === 200) {
      //     setBlog(response.data.data);
      // }
      navigate("/mycertificate")
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
    handleClose();
  }

  const [isApproved, setIsApproved] = useState(false);
  const handleDownload = () => {
    if (isApproved) {
      // Implement actual download logic here
      const link = document.createElement('a');
      link.href = 'path/to/your/certificate.pdf'; // Replace with the actual path to your certificate
      link.download = 'Certificate.pdf';
      link.click();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Pending':
      default:
        return 'orange';
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const certificatesData = await getCertificates('get-certificates');
        setMyCertificates(certificatesData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container className='my-4'>
        <h5 className="heading-text">
          MY CERTIFICATES
        </h5>
      <div className='text-end py-4'>
        <button className="button px-4" onClick={handleShow}>
          Apply for New Certificate
        </button>
      </div>
      <Col lg={4} md={6} sm={12} className="mx-auto">
        <Card className="p-4 shadow-lg border-0 rounded-4">
          <div className="d-flex flex-column gap-3">
            <div className="mb-3">
              <h5 className="font fw-bold mb-1">Course Name: <span className="text-primary">Beauty Parlour</span></h5>
              <h5 className="font fw-bold">Status:
                <span style={{ color: getStatusColor(status), fontWeight: "bold" }}> {status}</span>
              </h5>
            </div>
            <div className="text-center">
              <button
                disabled={!isApproved}
                onClick={handleDownload}
                className={`button px-4 py-2 ${isApproved ? 'btn-primary' : 'btn-secondary disabled'}`}
              >
                {!isApproved ? 'Download Certificate' : 'Pending Approval'}
              </button>
            </div>
          </div>
        </Card>
      </Col>
      <div>
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
      </div>
    </Container>
  );
}

export default MyCertificates;
