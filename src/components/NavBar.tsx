import { FC } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes'
import '../assets/css/NavBar.css'

const NavigationBar: FC = () => {
    return (
        <Navbar expand = "lg" className="divHeader nav">
            <Nav className="d-flex flex-row justify-content-start">
            <Navbar.Brand className="NavbarBrand" as={Link} to={ROUTES.HOME}> Конференции МГТУ </Navbar.Brand>
            <Navbar.Brand className="NavbarBrandSmall" as={Link} to={ROUTES.HOME}> МГТУ </Navbar.Brand>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight: '1em' }}/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="NavbarButtons ms-5">
            <Nav.Link as={Link} to={ROUTES.AUTHORS}>Авторы</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar