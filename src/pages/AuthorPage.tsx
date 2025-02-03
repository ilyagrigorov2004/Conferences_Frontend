import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from "react-router-dom"
import { Author } from '../api/Api'
import { AppDispatch } from '../store'
import { getAuthor } from '../slices/AuthorsSlice'
import { getAuthorsAttrs, useAttrs } from '../slices/AttrsSlice'
import { BreadCrumbs } from '../components/BreadCrumbs'
import '../assets/css/AuthorPage.css'
import BasePage from './BasePage'
import { ROUTES } from '../modules/Routes'

const AuthorPage: FC = () => {

    const [author, setAuthor] = useState<Author>({
        author_id: 0,
        name: '',
        description: '',
        url: '',
        department: '',
        birthdate: ''
    })

    const dispatch: AppDispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const attributes = useAttrs();

    useEffect(() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return

        dispatch(getAuthor(id_numeric)).then((response) => {
            if (response.type.includes('rejected')) {
                navigate(ROUTES.PAGE_404)
                return;
            }
            else {
                setAuthor(response.payload)
                dispatch(getAuthorsAttrs({ authorId: id_numeric }));
            }
        })
    }, [dispatch, id, navigate])

    return (
        <>
            <BasePage>
            <BreadCrumbs crumbs={[
                {
                    label: 'Авторы',
                    path: '/authors'
                },
                {
                    label: author?.name || ''
                }
            ]}></BreadCrumbs>
            <div className='authorBox d-flex flex-column align-items-center ms-3 me-3 ps-3 pe-3 content-fluid border' style={{ borderRadius: "10px" }}>
                <div className='container-fluid mt-3'>
                    <div className='authorContentBox row justify-content-center ps-3'>
                        <div className='img-box col-3 d-flex justify-content-center align-items-start mb-3' style={{ borderRadius: "10px"}}>
                            <img src={(author?.url || '').replace('http://localhost:9000', '') || '/img/no_photo_author.png'} className='author-img ' style={{ borderRadius: "10px" }}></img>
                        </div>
                        <div className='author-description ms-3 col-8 mt-2'>
                            <div style={{ fontFamily: 'Roboto', fontSize: '2em' }}>{author?.name}</div>
                            <div style={{ fontFamily: 'Roboto', fontSize: '1rem' }}>Области исследований: {author?.description}</div>
                            <div style={{ fontFamily: 'Roboto', fontSize: '1.5em' }}>Кафедра: {author?.department}</div>
                            <div style={{ fontFamily: 'Roboto', fontSize: '1.5em' }}>Дата рождения: {author?.birthdate ? new Date(author.birthdate).toLocaleDateString('ru-RU') : 'Неизвестно'}</div>
                        </div>
                    </div>
                    <div className='attributes mt-4 mb-3'>
                        <h3>Дополнительно</h3>
                        {attributes.map((attr) => (
                            <div key={attr.id} className='attribute'>
                                <strong>{attr.name}:</strong> {attr.value || 'Не указано'}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </BasePage>
        </>
    )
}

export default AuthorPage