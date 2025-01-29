import React, { useState, FormEvent } from 'react';
import { Form, Button,  Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch} from '../store';
import { registerUserAsync, setError } from '../slices/userSlice';
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from '../modules/Routes';
import BasePage from './BasePage';
import {BreadCrumbs} from '../components/BreadCrumbs';

const RegistrationPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '', first_name: '', last_name: '', email: '', password_confirm: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirm) {
            setError('Пароли не совпадают');
            return;
        }
        await dispatch(registerUserAsync(formData)); 
        navigate(`${ROUTES.LOGIN}`);
    };

    return (
        <BasePage>
        <BreadCrumbs crumbs={[{label: ROUTE_LABELS.REGISTRATION}]}></BreadCrumbs>
        <Container style={{ maxWidth: '100%', marginTop: '0' }}> 
            <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Регистрация</h2>
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
                    <Form.Group controlId="first_name" style={{ marginBottom: '15px' }}>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Введите имя"
                        />
                    </Form.Group>
                    <Form.Group controlId="last_name" style={{ marginBottom: '15px' }}>
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Введите фамилию"
                        />
                    </Form.Group>
                    <Form.Group controlId="email" style={{ marginBottom: '15px' }}>
                        <Form.Label>Почта</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Введите почту"
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
                    <Form.Group controlId="password_confirm" style={{ marginBottom: '20px' }}>
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control
                            type="password"
                            name="password_confirm"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            placeholder="Введите пароль еще раз"
                        />
                    </Form.Group>
                    <Button variant='primary' type="submit" className="my-btn w-100">
                        Зарегистрироваться
                    </Button>
                </Form>
            </Container>
        </Container>
        </BasePage>
    );
};

export default RegistrationPage;