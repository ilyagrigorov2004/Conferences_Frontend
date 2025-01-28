import { FC, useEffect, useState } from 'react'
import { AuthorI, getAuthors } from '../modules/Api'
import NavigationBar from '../components/NavBar'
import AuthorCard from '../components/AuthorCard'
import { Button } from 'react-bootstrap'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS } from '../modules/Routes'

const AuthorsPage: FC = () => {

    const [authors, setAuthors] = useState<AuthorI[]>([])
    const [searchAuthor, setSearchAuthor] = useState('')

    const updateAuthors = () => {
        getAuthors(searchAuthor).then((response) => {
            setAuthors(response.authors)
            console.log(response.authors)
        })
    }

    useEffect(() => {
        updateAuthors()
    }, [])

    const handleSearch = () => {
        updateAuthors()
    }

    return (
        <>
            <NavigationBar></NavigationBar>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.AUTHORS}]}></BreadCrumbs>
            <div className='d-flex flex-column'>
                <div className='d-flex w-100 justify-content-between align-items-start'>
                    <div className='d-flex justify-content-start align-items-center w-75'>
                        <InputField value={searchAuthor} setValue={setSearchAuthor} placeholder='Введите ФИО или кафедру' inputClass='InputField' />
                        <Button className='ms-3 d-flex align-items-center justify-content-center' variant='primary' onClick={handleSearch} style={{ width: '5em', height:'2em', backgroundColor:'#5a72b5'}}>Поиск</Button>
                    </div>
                    <img src='/src/assets/img/empty_basket.png' className='me-3' style={{height: "3rem"}}></img>
                </div>
                <div className='d-flex flex-wrap justify-content-center gap-5 me-4 mt-5 w-100'>
                    {authors.map((author) => {
                        return (
                            <AuthorCard key={author.author_id} id={author.author_id} FIO={author.name} url={author.url} dep = {author.department} ></AuthorCard>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AuthorsPage