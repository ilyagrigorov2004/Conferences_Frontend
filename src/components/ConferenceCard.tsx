
import { FC } from 'react'

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';

import '../assets/css/conferenceCard.css'

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

}

const ConferenceCard: FC<ConfCardProps> = (
    { conference_id, status, date_created, creator, date_formed, moderator, date_ended, conf_start_date, conf_end_date, members_count, review_result }
) => {

    return (
        <Link style={{textDecoration: 'none'}}to={`${ROUTES.CONFERENCES}/${conference_id}`}>
            <Card className='shadow shadow-bg w-100' >
                <Card.Body className='d-flex flex-column '>
                    <div className='d-flex flex-row w-100 h-100 flex-grow justify-content-center'>
                        <Card.Text className='conf-card-text'>{`Конференция №${conference_id}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Статус: ${status}`}</Card.Text>
                        <Card.Text className='conf-card-text'>{`Время создания: ${date_created != null ? date_created : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Время формирования: ${date_formed != null ? date_formed : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Время завершения: ${date_ended != null ? date_ended : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text'>{`Количество участников: ${members_count!= null ? members_count : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Результат рецензирования: ${review_result!= null ? review_result : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Время начала конференции: ${conf_start_date != null ? conf_start_date : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text-width'>{`Время конца конференции: ${conf_end_date != null ? conf_end_date : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text'>{`Организатор: ${creator!= null ? creator : '-'}`}</Card.Text>
                        <Card.Text className='conf-card-text'>{`Рецензент: ${moderator!= null ? moderator : '-'}`}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ConferenceCard