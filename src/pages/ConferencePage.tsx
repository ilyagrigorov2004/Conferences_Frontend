import { FC, useEffect } from 'react'

import BasePage from './BasePage'
import { Button, Form, Col} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { AppDispatch } from '../store'
import { setError, useConfStartDate, useConfEndDate, useMembersCount, useReviewResult, useAuthors, useIsDraft, setConfEndDate, setConfStartDate, deleteConference, updateConferenceFields, saveConference, getConf} from '../slices/conferenceSlice'
import AuthorCard from '../components/AuthorCard'

const ConferencePage: FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const { id } = useParams()

    const isDraft = useIsDraft()

    const navigate = useNavigate()
    const conf_start_date = useConfStartDate()
    const conf_end_date = useConfEndDate()
    const members_count = useMembersCount()
    const review_result = useReviewResult()
    const authors = useAuthors()

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
          try {
                await dispatch(deleteConference(id)).unwrap();
                navigate(ROUTES.AUTHORS);
            } catch (error) {
                dispatch(setError(error));
            }
        }
    };

    const handleSaveFields = () => {
        if (id) {
            try {
                dispatch(updateConferenceFields({ ConferenceId: id, conf_start_date: conf_start_date || '', conf_end_date: conf_end_date || '',  review_result: review_result || 0 }));
            } catch (error) {
                dispatch(setError(error));
            }
        }
    }

    const handleSaveConf = () => {
        if (id) {
            try {
                dispatch(saveConference(id));
                navigate(ROUTES.AUTHORS);
            } catch (error) {
                dispatch(setError(error));
            }
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(getConf(id));
        }
    }, [dispatch]);
    
    return (
    <>
        <BasePage>
            <BreadCrumbs crumbs={[
                {
                    label: 'Конференции',
                    path: '/conference'
                },
                {
                    label: 'Конференция №' + id?.toString() || '',
                }
            ]}></BreadCrumbs>
            <div className="container ">  
                <div className="fav-content mt-4">
                    <div className = "d-flex justify-content-between align-items-center">
                        <div>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>Информация о конференции</h2>
                            </div>
                            <div className="mb-4 ms-4">
                            {(!isDraft) ? (
                                <>
                                <div className="h4">Начало конференции: {conf_start_date ? new Date(conf_start_date).toLocaleString('ru-RU') : '-'}</div>
                                <div className="h4">Конец конференции: {conf_end_date ? new Date(conf_end_date).toLocaleString('ru-RU') : '-'}</div>
                                </>
                            ):(
                                <>
                                <Form.Group controlId="conf_start_date" className="mb-3 d-flex align-items-center">
                                    <Form.Label className="h4 me-3">Начало конференции:</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="conf_start_date"
                                        value={conf_start_date ? conf_start_date : ''}
                                        onChange={(e) => dispatch(setConfStartDate(e.target.value))}
                                        style={{ width: 'auto' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="conf_end_date" className="mb-3 d-flex align-items-center">
                                    <Form.Label className="h4 me-3">Конец конференции:</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="conf_end_date"
                                        value={conf_end_date ? conf_end_date : ''}
                                        onChange={(e) => dispatch(setConfEndDate(e.target.value))}
                                        style={{ width: 'auto' }}
                                    />
                                </Form.Group>
                                </>
                            )}
                                <h4>Количество участников: {members_count}</h4>
                            </div>
                        </div>
                        <div>
                            {(isDraft) &&
                                <div className = "d-flex flex-column">
                                <Button className="my-btn mb-3" onClick={handleDelete}>
                                    Удалить
                                </Button>
                                <Button className="my-btn mb-3" onClick={handleSaveFields}>
                                    Сохранить данные
                                </Button>
                                <Button className="my-btn" onClick={handleSaveConf}>
                                    Сохранить конференцию
                                </Button>
                                </div>
                            }
                        </div>    
                    </div>
                    <h2>Участники</h2>
                    <div className="d-flex flex-column">
                        {authors.length ? (
                            authors.map((author, index) => (
                                <Col key={author.author?.author_id || index} className="mb-3">
                                    <AuthorCard
                                        id={author.author?.author_id || 11}
                                        url={author.author?.url || ''}
                                        FIO={author.author?.name || ''}
                                        dep={author.author?.department || ''}
                                        isCor={author.is_corresponding || false}
                                        isDraft = {isDraft}
                                    />
                                </Col>
                        ))
                        ) : (
                            <section>
                                <h1>Конференция не найдена</h1>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </BasePage>
    </>
  );
};

export default ConferencePage;