import { FC, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { AuthorI, getAuthor } from '../modules/Api'
import Navigationbar from '../components/NavBar'
import { BreadCrumbs } from '../components/BreadCrumbs'

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
            <div className='d-flex flex-column align-items-center ms-4 me-4 content-fluid border' style={{ borderRadius: "10px" }}>
                <div className='container-fluid mt-3'>
                    <div className='row justify-content-center'>
                        <div className='col-3 p-0 d-flex justify-content-center align-items-center mb-3' style={{ borderRadius: "10px"}}>
                            <img src={author?.url} className='author-img w-100' style={{ borderRadius: "10px" }}></img>
                        </div>
                        <div className='author-description ps-5 col-8 mt-2'>
                            <div style={{ fontFamily: 'Roboto', fontSize: '2em' }}>{author?.name}</div>
                            <p>Области исследований: {author?.description}</p>
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