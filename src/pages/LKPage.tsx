import React, { useState, FormEvent, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { changePersonalDataAsync, setError, useIsAuthenticated } from '../slices/userSlice';
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from '../modules/Routes';
import BasePage from './BasePage';
import {BreadCrumbs} from '../components/BreadCrumbs';

const LKPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '', first_name: '', last_name: '', email: '', password_confirm: '' });
    const username = useSelector((state: RootState) => state.user.username);
    const data = useSelector((state: RootState) => state.user.data);
    const isAuthenticated = useIsAuthenticated();

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
        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== '')
        );
        await dispatch(changePersonalDataAsync(filteredFormData));
        navigate(`${ROUTES.AUTHORS}`);
    };

    useEffect(() => {      
        if (!isAuthenticated) {
            navigate(ROUTES.PAGE_403);
            return;
        }
        dispatch(changePersonalDataAsync({}));
        setFormData({username: username, first_name: data.first_name, last_name: data.last_name, email: data.email, password: '', password_confirm: ''});
    },[dispatch])

    return (
        <BasePage>
        <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ACCOUNT}]}></BreadCrumbs>
        <Container style={{ maxWidth: '100%', marginTop: '0' }}> 
            <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Личный аккаунт</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" style={{ marginBottom: '15px' }}>
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Введите имя пользователя"
                            disabled
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
                        Изменить данные
                    </Button>
                </Form>
            </Container>
        </Container>
        </BasePage>
    );
};

export default LKPage;