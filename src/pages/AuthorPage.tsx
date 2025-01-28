import { FC, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { AuthorI, getAuthor } from '../modules/Api'
import Navigationbar from '../components/NavBar'
import { BreadCrumbs } from '../components/BreadCrumbs'
import '../assets/css/AuthorPage.css'

const AuthorPage: FC = () => {

    const [author, setAuthor] = useState<AuthorI>({
        author_id: 0,
        name: '',
        description: '',
        url: '',
        department: '',
        birthdate: ''
    })

    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        let id_numeric: number = parseInt(id)
        if (isNaN(id_numeric)) return

        getAuthor(id_numeric).then((response) => {
            setAuthor(response)
        })
    }, [])

    return (
        <>
            <Navigationbar/>
            <BreadCrumbs crumbs={[
                {
                    label: 'Авторы',
                    path: '/authors'
                },
                {
                    label: author?.name
                }
            ]}></BreadCrumbs>
            <div className='authorBox d-flex flex-column align-items-center ms-3 me-3 ps-3 pe-3 content-fluid border' style={{ borderRadius: "10px" }}>
                <div className='container-fluid mt-3'>
                    <div className='authorContentBox row justify-content-center ps-3'>
                        <div className='img-box col-3 d-flex justify-content-center align-items-start mb-3' style={{ borderRadius: "10px"}}>
                            <img src={author?.url.replace('http://localhost:9000', '') || '/Conferences_Frontend/img/no_photo_author.png'} className='author-img ' style={{ borderRadius: "10px" }}></img>
                        </div>
                        <div className='author-description ms-3 col-8 mt-2'>
                            <div style={{ fontFamily: 'Roboto', fontSize: '2em' }}>{author?.name}</div>
                            <div style={{ fontFamily: 'Roboto', fontSize: '1rem' }}>Области исследований: {author?.description}</div>
                            <div style={{ fontFamily: 'Roboto', fontSize: '1.5em' }}>Кафедра: {author?.department}</div>
                            <div style={{ fontFamily: 'Roboto', fontSize: '1.5em' }}>Дата рождения: {new Date(author?.birthdate).toLocaleDateString('ru-RU')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthorPage