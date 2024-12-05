import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import ReusableSwiper from "../Plugins/Swiper";
import Contact from "./Contact";
AOS.init();
function Home() {
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
      id: 6,
      image: '/images/nikhil.jpg',
      name: 'Michael Lee',
      comment: 'Highly recommend this course to others.',
      certificate: 'Beauty Parlour Certificate'
    },
  ];
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/about-us')
  }

  const handleViewNavigate = () => {
    navigate("/testmonials")
  }
  const visibleCardLimit = 4

  return (
    <Container fluid className='px-0' style={{overflow:'hidden'}}>
      <section className='home p-5'>
        <div className="home-content" data-aos="fade-down">
          <h1 className='text-darkssss'>"From thread to trend – start your journey today."</h1>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
          >
            <Image src="./images/home_parlour.jpg" alt="Image" roundedCircle className="home-image border border-dark border-5" />
          </motion.div>
        </div>
      </section>

      <section className='about p-3 p-lg-5'>
        <Row data-aos="fade-down">
          <Col lg={6} md={12}>
            <Image src="./images/class_image.webp" height="100%" width="100%" style={{ borderRadius: '10px' }} />
          </Col>
          <Col lg={6} md={12}>
            <h3 className="heading-text mt-3 mt-lg-0">ABOUT</h3>
            <p>Silai Studio
              A clothing label that uses traditional Indian weaving, printing, and embroidery techniques to create simple, comfortable clothing. Silai Studio retails in stores and online, and also has a separate e-commerce brand called MAIDAAN.
              Women's Clothes Stitching Services
              A manufacturer and wholesaler of women's and children's clothing in Pune. They offer services such as wholesale, third-party manufacturing, stitching job work, and pattern sample making.
              Rexine Quilting Stitching Service
              A specialized tailoring service that creates padded quilted patterns on rexine, a leather-like material. Quilting can enhance the look, durability, and comfort of rexine. </p>
            <div className="text-center">
              <button onClick={handleNavigate} className="button">Read More...</button>
            </div>
          </Col>
        </Row>
      </section>

      <section className="testmonials py-3" data-aos="fade-up">
        <div>
          <h3 className="heading-text">TESTMONIALS</h3>
          <div className="text-end pe-3">
            <button onClick={handleViewNavigate} className="button px-3">View All</button>
          </div>
        </div>

        <div>
          <ReusableSwiper uniqueId="testmonials">
            {userItems.map((item) => (
              <SwiperSlide key={item.id} >
                <div >
                  <div className="text-center pt-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.4 }}
                    // style={{ overflow: 'hidden' }}
                    >
                      <Image
                        variant="top"
                        src={item.image}
                        alt={item.name}
                        width="200px"
                        height="200px"
                        roundedCircle
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="text-center my-3 font">
                    <h4>{item.name}</h4>
                    <h5>{item.certificate}</h5>
                    <p>{item.comment}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </ReusableSwiper>
        </div>
      </section>

      <section className="contact py-3" data-aos="fade-up">
        <Contact />
      </section>
    </Container>
  )
}

export default Home