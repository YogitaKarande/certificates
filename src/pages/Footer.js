import { Container } from "react-bootstrap";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid className="border-top border-white footer border-2 py-4">
      <div className="text-center text-white font">
        <span>&copy; 2024 All rights reserved</span>
      </div>
    </Container>
  )
}

export default Footer;