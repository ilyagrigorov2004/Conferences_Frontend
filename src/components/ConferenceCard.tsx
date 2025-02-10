import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';

import '../assets/css/conferenceCard.css'
import { useIsCurator } from '../slices/userSlice';
import { confirmConference, rejectConference } from '../slices/conferencesSlice';
import { updateConferenceFields } from '../slices/conferenceSlice';

interface ConfCardProps {
    conference_id: number,
    status: string,
    date_created: string,
    creator: string,
    date_formed: string,
    moderator: string,
    date_ended: string,
    conf_start_date: string,
    conf_end_date: string,
    members_count: number,
    review_result: number,
    qr: string

}

const ConferenceCard: FC<ConfCardProps> = (
    { conference_id, status, date_created, creator, date_formed, moderator, date_ended, conf_start_date, conf_end_date, members_count, review_result, qr }
) => {
    const dispatch = useDispatch<AppDispatch>()
    const isCurator = useIsCurator();
    const [review_result_, set_review_result_] = useState<string>('')

    const handleConfirmConference = async () => {
        try {
            await dispatch(updateConferenceFields({ 
                ConferenceId: conference_id.toString(), 
                conf_start_date: '', 
                conf_end_date: '',
                review_result: parseInt(review_result_),
            })).unwrap();
            await dispatch(confirmConference(conference_id)).unwrap();
        } catch (error) {
            console.error("Ошибка при подтверждении конференции:", error);
        }
    }

    const handleRejectConference = async () => {
        try {
            await dispatch(updateConferenceFields({ 
                ConferenceId: conference_id.toString(), 
                conf_start_date: '', 
                conf_end_date: '',
                review_result: parseInt(review_result_),
            })).unwrap();
            await dispatch(rejectConference(conference_id)).unwrap();
        } catch (error) {
            console.error("Ошибка при отклонении конференции:", error);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_review_result_(e.target.value || '');

    };


    useEffect(() => {   
        if (review_result != null)
            set_review_result_(review_result.toString());
        else set_review_result_('');
    },[])

    return (
        
            <Card className='shadow shadow-bg w-100' >
                <Card.Body className='d-flex flex-column '>
                    <div className='d-flex flex-row w-100 h-100 flex-grow justify-content-center'>
                        <Link style={{textDecoration: 'none'}}to={`${ROUTES.CONFERENCES}/${conference_id}`}>
                            <Card.Text className='conf-card-text'>{`Конференция №${conference_id}`}</Card.Text>
                        </Link>
                        <Card.Text className='conf-card-text-width'>{`Статус: ${status}`}</Card.Text>
                        <Card.Text className='conf-card-text'>{`Время создания: ${date_created != null ? date_created : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Время формирования: ${date_formed != null ? date_formed : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Время завершения: ${date_ended != null ? date_ended : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text'>{`Количество участников: ${members_count!= null ? members_count : '-'}`}</Card.Text>
                        {isCurator && status == 'Сформирована' ? (
                            <Form.Group controlId="formReviewResult" className='conf-card-text'>
                                <Form.Label>Результат рецензирования</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={review_result_} 
                                    onChange={handleInputChange} 
                                    pattern="^-?\d*\.?\d*$" // Allow negative numbers and decimals
                                />
                            </Form.Group>
                        ) : (
                            <Card.Text className='conf-card-text-width'>{`Результат рецензирования: ${review_result != null ? review_result : '-'}`}</Card.Text>
                        )}
                        <Card.Text className='conf-card-text-width'>{`Время начала конференции: ${conf_start_date != null ? conf_start_date : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Время конца конференции: ${conf_end_date != null ? conf_end_date : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text'>{`Организатор: ${creator!= null ? creator : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text'>{`Рецензент: ${moderator!= null ? moderator : '-'}`}</Card.Text>

                        {isCurator && (
                        <div className="d-flex flex-row justify-content-end align-items-center ms-auto me-3">
                            <Button 
                                className="me-2" 
                                variant="outline-success" 
                                onClick={handleConfirmConference} 
                                disabled={status !== 'Сформирована'}
                            >
                                Принять
                            </Button>
                            <Button 
                                variant="outline-danger" 
                                onClick={handleRejectConference} 
                                disabled={status !== 'Сформирована'}
                            >
                                Отклонить
                            </Button>
                        </div>
                    )}
                    <div className="conf-icon">
                    {status === 'Сформирована' ? (
                        <img className="status-icon" src="/img/time.png" alt="Time Icon" />
                    ) : (
                        <div className="qr-hover-wrapper">
                            <img className="status-icon" src="/img/href.png" alt="QR Icon" />
                            <div className="qr-hover">
                                {qr && <img className="qr-code" src={`data:image/png;base64,${qr}`} alt="QR Code" />}
                            </div>
                        </div>
                    )}
                </div>
                    </div>
                </Card.Body>
            </Card>
        
    )
}

export default ConferenceCard