import { FC } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ROUTES } from '../modules/Routes'
import '../assets/css/NavBar.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useIsAuthenticated, useUsername, logoutUserAsync } from '../slices/userSlice';
import { getAuthorsList, resetAuthorsStateAction } from '../slices/AuthorsSlice';
import { resetConferenceState } from '../slices/conferenceSlice';
import { resetConferencesState } from '../slices/conferencesSlice';

const NavigationBar: FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const username = useUsername();
    const isAuthenticated = useIsAuthenticated();

    const handleExit = async ()  => {
        await dispatch(logoutUserAsync());
        dispatch(resetAuthorsStateAction());
        dispatch(resetConferenceState());
        dispatch(resetConferencesState());
        navigate('/authors'); // переход на страницу списка услуг
        await dispatch(getAuthorsList()); // для показа очищения поля поиска
    }

    return (
        <Navbar expand = "lg" className="divHeader nav">
            <Nav className="d-flex flex-row justify-content-start">
            <Navbar.Brand className="NavbarBrand" as={Link} to={ROUTES.HOME}> Конференции МГТУ </Navbar.Brand>
            <Navbar.Brand className="NavbarBrandSmall" as={Link} to={ROUTES.HOME}> МГТУ </Navbar.Brand>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight: '1em' }}/>
            <Navbar.Collapse id="basic-navbar-nav">
            {isAuthenticated? (
                <Nav className="d-flex w-100 ms-4 align-items-center" style={{ fontSize: '1.3rem' }}>
                <Nav.Link  as={Link} to={ROUTES.AUTHORS}>Авторы</Nav.Link>
                <Nav.Link as={Link} to={ROUTES.CONFERENCES}> Конференции</Nav.Link>  
                <Nav.Link  as={Link} to={ROUTES.ACCOUNT} className="d-flex ms-lg-auto username">{ username }</Nav.Link>  
                <Button variant="primary" type="submit" className="my-btn me-lg-5" onClick={ handleExit }>
                    Выйти
                </Button>
                </Nav>
            ):(
                <Nav className="NavBarTextStyle d-flex justify-content-between w-100 me-auto ms-4" style={{ fontSize: '1.3rem' }}>
                <Nav.Link  as={Link} to={ROUTES.AUTHORS} className='NavBarTextStyle'>Авторы</Nav.Link>
                <Nav.Link  as={Link} to={ROUTES.LOGIN} className="NavBarTextStyle d-flex ms-lg-auto">Вход</Nav.Link>
                <Nav.Link  as={Link} to={ROUTES.REGISTRATION} className='NavBarTextStyle me-5'>Регистрация</Nav.Link>
                </Nav>
            )}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar