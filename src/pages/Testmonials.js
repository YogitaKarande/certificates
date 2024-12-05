import { Col, Container, Image, Row } from "react-bootstrap";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Testmonials() {
  const userItems = [
    {
      id: 1,
      image: './images/yogesh.jpg',
      name: 'John Doe',
      comment: 'Great experience! Loved the course.',
      certificate: 'Beauty Parlour Certificate'
    },
    {
      id: 2,
      image: './images/yogita.jpg',
      name: 'Jane Smith',
      comment: 'Very informative and well-structured.',
      certificate: 'Beauty Parlour Certificate'
    },
    {
      id: 3,
      image: './images/yogesh.jpg',
      name: 'Alex Johnson',
      comment: 'Helped me land a job!',
      certificate: 'Beauty Parlour Certificate'
    },
    {
      id: 4,
      image: './images/shila.jpg',
      name: 'Emily Davis',
      comment: 'A well-rounded program for developers.',
      certificate: 'Beauty Parlour Certificate'
    },
    {
      id: 5,
      image: '/images/rina.jpg',
      name: 'Michael Lee',
      comment: 'Highly recommend this course to others.',
      certificate: 'Beauty Parlour Certificate'
    },
    {
      id: 5,
      image: '/images/nikhil.jpg',
      name: 'Michael Lee',
      comment: 'Highly recommend this course to others.',
      certificate: 'Beauty Parlour Certificate'
    },
  ];

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/')
  }
  return (
    <Container >
      <div className="my-5">
        <h3 className="heading-text">TESTMONIALS</h3>
        <div className="ms-5 mt-3">
          <button onClick={handleNavigate} className="button px-3"><MdKeyboardDoubleArrowLeft size={24}/>Back</button>
        </div>
      </div>
      <Row className='mt-4'>
        {userItems.map((item, index) => (
          <Col lg={3} md={6} sm={12} key={index} className="text-center font">
            <div>
              <Image
                variant="top"
                src={item.image}
                alt={item.name}
                width="200px"
                height="200px"
                roundedCircle
                style={{
                  objectFit: 'cover',
                }}
              />
              <h4 className="my-3">{item.name}</h4>
              <h5>{item.certificate}</h5>
              <p>{item.comment}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Testmonials