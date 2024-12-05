import { useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaUser } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [isAuthenticate, setIsAuthenticate] = useState()
    const handleLogout = () => {
        navigate('/login')
    }
    const handleNavLinkClick = () => {
        setExpanded(false);
    };

    return (
        <>
            <Navbar expand="lg" expanded={expanded} className="header nav_2 nav_1 shadow-lg px-5">
                <Navbar.Brand as={NavLink} to="/" className="text-white ms-lg-5">
                    Certificate
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav ' onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 my-custom-nav ms-md-3">
                        <Nav.Link as={NavLink} className='header-nav' to="/" onClick={handleNavLinkClick}>Home</Nav.Link>
                        <Nav.Link as={NavLink} className='header-nav' to="certificates" onClick={handleNavLinkClick}>Certificates</Nav.Link>
                        <Nav.Link as={NavLink} className='header-nav' to="about-us" onClick={handleNavLinkClick}>About Us</Nav.Link>
                        <Nav.Link as={NavLink} className='header-nav' to="contact" onClick={handleNavLinkClick}>Contact Us</Nav.Link>
                        {!isAuthenticate == null ? (
                            <>
                                <Nav.Link as={NavLink} className='header-nav' to="login" onClick={handleNavLinkClick}><FaUser className='me-2' />Login</Nav.Link>
                                <Nav.Link as={NavLink} className='header-nav' to="register" onClick={handleNavLinkClick}><FaUser className='me-2' />Register</Nav.Link>
                            </>
                        ) : (
                            <NavDropdown
                                title={<span style={{ color: 'white' }}>My Account</span>}
                                className='header-nav dropdown-menu-start'
                                data-toggle="collapse"
                            >
                                <NavDropdown.Item as={NavLink} to="changepass" onClick={handleNavLinkClick}><RiLockPasswordFill className='me-2'/>Change Password</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="mycertificate" onClick={handleNavLinkClick}  ><GrCertificate className='me-2'/>My Certificate</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    handleLogout();
                                    handleNavLinkClick();
                                }}><IoLogOut className='me-2'/>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Header;
