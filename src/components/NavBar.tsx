import { FC } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes'
import '../assets/css/NavBar.css'

const NavigationBar: FC = () => {
    return (
        <Navbar className="divHeader">
            <Navbar.Brand className="NavbarBrand" as={Link} to={ROUTES.HOME}> Конференции МГТУ </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight: '1em' }}/>
            <Nav className="NavbarButtons">
            <Nav.Link as={Link} to={ROUTES.AUTHORS}>Авторы</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar