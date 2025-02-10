import { FC, useEffect, useState } from 'react'
import { AuthorsI, AuthorI, getAuthors } from '../modules/Api'
import NavigationBar from '../components/NavBar'
import AuthorCard from '../components/AuthorCard'
import { Button } from 'react-bootstrap'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS } from '../modules/Routes'
import { setSearchValueAction, useSearchValue } from '../slices/dataSlice'
import { useDispatch } from 'react-redux'
import { AUTHORS_MOCK } from '../modules/Mock'

const AuthorsPage: FC = () => {

    const [authors, setAuthors] = useState<AuthorI[]>([])
    const [searchAuthor, setSearchAuthor] = useState('')

    const storedSearchValue = useSearchValue()
    const dispatch = useDispatch()

    const updateAuthors = (searchAuthorVar = '') => {
        let getRes = false
        if (searchAuthorVar == '') searchAuthorVar = searchAuthor
        dispatch(setSearchValueAction(searchAuthorVar))

        getAuthors(searchAuthorVar).then((response) => {
            setAuthors(response.authors)
            getRes = true
        })

        setTimeout(() => {
            if (!getRes) {
                let result: AuthorsI = { current_conference: AUTHORS_MOCK.current_conference, authors: [] };
                AUTHORS_MOCK.authors.forEach((author: AuthorI) => {
                    if (author.name.includes(searchAuthorVar) || author.department.includes(searchAuthorVar)) {
                        result.authors.push(author);
                    }
                });
                setAuthors(result.authors)
            }
        }, 1000);
    }

    useEffect(() => {
        setSearchAuthor(storedSearchValue)
        updateAuthors(storedSearchValue)
    }, [])

    const handleSearch = () => {
        updateAuthors()
    }

    return (
        <>
            <NavigationBar></NavigationBar>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.AUTHORS}]}></BreadCrumbs>
            <div className='d-flex flex-column '>
                <div className='d-flex w-100 justify-content-between align-items-start'>
                    <div className='d-flex justify-content-start align-items-center w-75'>
                        <InputField value={searchAuthor} setValue={setSearchAuthor} placeholder='Введите ФИО или кафедру' inputClass='InputField' />
                        <Button className='ms-3 d-flex align-items-center justify-content-center' variant='primary' onClick={handleSearch} style={{ width: '5em', height:'2em', backgroundColor:'#5a72b5'}}>Поиск</Button>
                    </div>
                    {/* <img src='/src/assets/img/empty_basket.png' className='me-3' style={{height: "3rem"}}></img> */}
                </div>
                <div className='d-flex flex-row' style={{justifyContent: 'center'}}>
                <div className='d-flex flex-wrap gap-5 me-4 mt-5 mb-5 w-100' style={{ maxWidth: '1200px', justifyContent: 'center'}}>
                    {authors.map((author) => {
                        return (
                            <AuthorCard key={author.author_id} id={author.author_id} FIO={author.name} url={author.url} dep={author.department}></AuthorCard>
                        )
                    })}
                </div>
                </div>
            </div>
        </>
    )
}

export default AuthorsPage