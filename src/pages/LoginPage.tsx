import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { AppDispatch} from '../store';
import { loginUserAsync} from '../slices/userSlice';
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from '../modules/Routes';
import BasePage from './BasePage';
import {BreadCrumbs} from '../components/BreadCrumbs';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '' });

    // Обработчик события изменения полей ввода (username и password)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обработчки события нажатия на кнопку "Войти"
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(loginUserAsync(formData));
        navigate(`${ROUTES.AUTHORS}`); 
    };

    return (
        <BasePage>
        <BreadCrumbs crumbs={[{label: ROUTE_LABELS.LOGIN}]}></BreadCrumbs>
        <Container style={{ maxWidth: '100%', marginTop: '0' }}> 
            <Container style={{ maxWidth: '400px', marginTop: '150px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Вход в систему</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" style={{ marginBottom: '15px' }}>
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Введите имя пользователя"
                        />
                    </Form.Group>
                    <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                        />
                    </Form.Group>
                    <Button variant='primary' type="submit" className="my-btn w-100">
                        Войти
                    </Button>
                </Form>
            </Container>
        </Container>
        </BasePage>
    );
};

export default LoginPage;