import { FC, useEffect} from 'react'
import { useIsAuthenticated } from '../slices/userSlice'
import AuthorCard from '../components/AuthorCard'
import { Button } from 'react-bootstrap'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTE_LABELS, ROUTES } from '../modules/Routes'
import { setSearchValueAction, useSearchValue, getAuthorsList, useAuthors } from '../slices/AuthorsSlice'
import { AppDispatch } from '../store'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../assets/css/authorsPage.css'
import {useAuthorsInConfCount, useConfId } from '../slices/conferenceSlice'
import BasePage from './BasePage'

const AuthorsPage: FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useIsAuthenticated();
    const conf_id = useConfId();
    const authors_in_conf_count = useAuthorsInConfCount();

    const search_value = useSearchValue();
    const authors = useAuthors();

    useEffect(() => {      
        dispatch(getAuthorsList());
    },[dispatch])

    const setSearchValue = (value: string ) => {
        dispatch(setSearchValueAction(value))
    }

    return (
        <>
            <BasePage>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.AUTHORS}]}></BreadCrumbs>
            <div className='d-flex flex-column '>
                <div className='d-flex w-100 justify-content-around align-items-start' style={{height: '5em'}}>
                    <div className='d-flex justify-content-start align-items-center w-75'>
                        <InputField value={search_value} setValue={setSearchValue} placeholder='Введите ФИО или кафедру' inputClass='InputField' date={false} valuetype="string"/>
                        <Button className='ms-3 d-flex align-items-center justify-content-center my-btn ' onClick={() => dispatch(getAuthorsList())} style={{ width: '5em', height:'2em'}}>Поиск</Button>
                    </div>
                    {(!isAuthenticated || !conf_id) ? 
                    <img src='/img/empty_basket.png' className='basket_img'></img>
                    : (
                        <div>
                        <Link to={`${ROUTES.CONFERENCES}/${conf_id}`}>
                            <img src='/img/full_basket.png' className='basket_img'></img>
                        </Link>
                        <div className='authors_in_conf_count'>{authors_in_conf_count}</div>
                        </div>
                    )}

                </div>
                <div className='d-flex flex-row' style={{justifyContent: 'center'}}>
                <div className='d-flex flex-wrap gap-5 me-4 mt-5 mb-5 w-100' style={{ maxWidth: '1200px', justifyContent: 'center'}}>
                    {authors.map((author) => {
                        return (
                            <AuthorCard key={author.author_id} id={author.author_id!} FIO={author.name!} url={author.url || '/img/no_photo_author.png'} dep={author.department!}></AuthorCard>
                        )
                    })}
                </div>
                </div>
            </div>
            </BasePage>
        </>
    )
}

export default AuthorsPage