import { FC } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import '../assets/css/fonts.css'

interface AuthorCardProps {
    id: number
    FIO: string
    url: string
    dep: string
}

const AuthorCard: FC<AuthorCardProps> = (
    { id, FIO, url, dep }
) => {
    return (
        <Card style={{ width: '15rem', height: '24rem', filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.75))' }} >
            <Link className='d-flex flex-column justify-content-center align-items-center'style={{ width: '100%', height: '70%' }} to={`${ROUTES.AUTHORS}/${id}`}>
            <Card.Img className='mt-3' style={{ width: '85%', height: '90%' }} src={url.replace('http://localhost:9000', '') || '/img/no_photo_author.png'}/>
            </Link>
            <Card.Body className='d-flex flex-column text-start justify-content-space-between'>
            <Card.Title style={{ fontFamily: 'Roboto', fontSize: '1em'}}>{FIO}</Card.Title>
            <Card.Title style={{ fontFamily: 'Roboto', fontSize: '1em', color: 'gray'}}>{dep}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default AuthorCard