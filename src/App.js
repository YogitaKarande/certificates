import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Certificates from './pages/Certificates';
import ChangePassword from './pages/ChangePassword';
import Contact from './pages/Contact';
import CertificateDetails from './pages/Details';
import Footer from './pages/Footer';
import Forget from './pages/Forget';
import Header from './pages/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import MyCertificates from './pages/MyCertificates';
import Register from './pages/Register';
import Testmonials from './pages/Testmonials';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className='text-dark'>
        <MainContent />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

function MainContent() {
  const location = useLocation();

  // Pages that need to have centered content
  const centeredPages = ['/login', '/register', '/forget', '/changepass','/contact'];

  const isCenteredPage = centeredPages.includes(location.pathname);

  return (
    <div
      className={isCenteredPage ? "d-flex flex-column justify-content-center align-items-center" : ""}
      style={{
        minHeight: isCenteredPage ? '82vh' : '82vh',
        display: isCenteredPage ? 'flex' : 'block',
        justifyContent: isCenteredPage ? 'center' : 'flex-start',
        alignItems: isCenteredPage ? 'center' : 'flex-start',
      }}
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='certificates' element={<Certificates />} />
        <Route path='details' element={<CertificateDetails />} />
        <Route path='forget' element={<Forget />} />
        <Route path='changepass' element={<ChangePassword />} />
        <Route path='mycertificate' element={<MyCertificates />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about-us' element={<About />} />
        <Route path='testmonials' element={<Testmonials />} />
      </Routes>
    </div>
  );
}

export default App;
