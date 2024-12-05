import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { getCertificates } from "../api/Api";
AOS.init();
function Certificates() {
    const fakeData = [
        { id: 1, name: "Beauty Parlour", email: "john.doe@example.com", age: 28, image: "./images/beauty_parlour.jpg" },
        { id: 2, name: "Beauty Parlour", email: "jane.smith@example.com", age: 34, image: "./images/beautyparlour.webp" },
        { id: 3, name: "Silai Machine", email: "alice.johnson@example.com", age: 25, image: "./images/silai.jpg" },
    ];
    const [certificates, setCertificates] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const certificatesData = await getCertificates('get-certificates');
                setCertificates(certificatesData);
            } catch (error) {
                console.error('Error fetching state data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <Container className="px-3 py-4 px-lg-0" data-aos="fade-right">
            <h6 className='heading-text my-3 text-muted'>CERTIFICATES</h6>
            <Row>
                {fakeData.map((user) => (
                    <Col key={user.id} lg={3} md={6} sm={12} className="pt-3">
                       <h4 className='font text-center'>{user.name}</h4>
                        <Card>
                            <div>
                                <Card.Img variant="top" src={user.image} alt={user.name} height="300px" width="200px" style={{objectFit:'contain'}} />
                            </div>
                            <div className='my-3'>
                                <NavLink to="/details" className="view-details nav-link font ps-2 fs-5">View details...</NavLink>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container >
    );
}

export default Certificates;
