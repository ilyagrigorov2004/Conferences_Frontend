import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../modules/Routes';
import { useLocation } from 'react-router-dom';
import '../assets/css/fonts.css'
import { useIsAuthenticated } from '../slices/userSlice';
import { addAuthorToConference, deleteAuthorFromConference, setAuthors, updateAuthorDetails, useAuthors, useConfId } from '../slices/conferenceSlice';
import { getAuthorsList } from '../slices/AuthorsSlice';

interface AuthorCardProps {
    id: number
    FIO: string
    url: string
    dep: string
    isCor?: boolean
    isDraft?: boolean;
}

const AuthorCard: FC<AuthorCardProps> = (
    { id, FIO, url, dep, isCor = false, isDraft = false }
) => {

    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useIsAuthenticated();
    const conf_id = useConfId();
    const authors = useAuthors();
    const { pathname } = useLocation();

    const handleAdd = async () => {
        if (id) {
            await dispatch(addAuthorToConference(id));
            await dispatch(getAuthorsList()); // Для обновления отображения состояния иконки "корзины" 
        }
    }

    const handleDeleteAuthorFromConf = async () => {
        if (conf_id && id) {
            await dispatch(deleteAuthorFromConference({ConferenceId: conf_id, authorId: id}));
        }
    }

    const handleUpdateAuthor = async () => {
        if (conf_id && id) {
            await dispatch(updateAuthorDetails({ConferenceId: conf_id, authorId: id, is_corresponding: isCor}));
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedAuthors = authors.map(author => 
            author.author?.author_id === id ? { ...author, is_corresponding: (e.target as HTMLInputElement).checked } : author
        );
        dispatch(setAuthors(updatedAuthors));
    };
    
    if (pathname === "/authors") return  (
        <Card style={{ width: '17rem', height: '32rem', filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.75))' }} >
            <Link className='d-flex flex-column justify-content-center align-items-center' style={{ width: '100%', height: '320px' }} to={`${ROUTES.AUTHORS}/${id}`}>
                <Card.Img className='card-img ' style={{ width: '210px', height: '280px'}} src={url.replace('http://localhost:9000', '') || '/img/no_photo_author.png'}/>
            </Link>
            <Card.Body className='d-flex flex-column text-start justify-content-start'>
            <Card.Title style={{ fontFamily: 'Roboto', fontSize: '1em'}}>{FIO}</Card.Title>
            <Card.Title style={{ fontFamily: 'Roboto', fontSize: '1em', color: 'gray'}}>{dep}</Card.Title>
            {(isAuthenticated == true ) && (
                <Button className="my-btn mt-auto" onClick={() => handleAdd()}>
                    Добавить
                </Button>
                )}   
            </Card.Body>
        </Card>
    )
    if (pathname.includes("/conference"))
        return (
            <div className='d-flex gap-4 border p-3' style = {{height: '280px'}}>
            <Link to={`${ROUTES.AUTHORS}/${id}`} className='d-flex justify-content-center align-items-center'>
                <Card.Img className='card-img' src={url} style={{ width: '220px', height: '280px'}}></Card.Img>
            </Link>
            <div className='d-flex w-75 justify-content-center align-items-center text-center text-uppercase'>
                <h3>{FIO}</h3>
            </div>
            <div className='separator'></div>
            <div className='d-flex flex-column p-2 justify-content-center align-items-center'>
                <div className='d-flex flex-column gap-2'>
                    <div className='d-flex'>
                        {isDraft? (
                            <div>
                                <Form.Group controlId="phone" className=" d-flex align-items-center">
                                    <Form.Label className="h4 me-3">Руководитель:</Form.Label>
                                    <Form.Check 
                                        type="checkbox" 
                                        checked={isCor} 
                                        onChange={handleInputChange} 
                                        className='me-5' 
                                    />
                                <Button className="my-btn me-2" onClick={() => handleUpdateAuthor()}>
                                    Изменить
                                </Button>
                                <Button className="my-btn" onClick={() => handleDeleteAuthorFromConf()}>
                                    Исключить
                                </Button>
                                </Form.Group>
                            </div>
                        ):(
                            <div style={{ fontSize: '1.4em', marginRight: '5em', width: '13rem'}}>Руководитель: {isCor?('да'):('нет')}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        )
}

export default AuthorCard