import { FC, useEffect } from 'react'
import { Author } from '../api/Api'

import { Button } from 'react-bootstrap'
import InputField from '../components/InputField'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { ROUTES, ROUTE_LABELS } from '../modules/Routes'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store';
import { getAuthorsList, setSearchValueAction } from '../slices/AuthorsSlice'
import { useNavigate } from 'react-router-dom';
import AuthorChangeCard from '../components/AuthorChangeCard'
import { useIsAuthenticated, useIsCurator } from '../slices/userSlice'

import BasePage from './BasePage'

const AuthorsListPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useIsAuthenticated();
    const isCurator = useIsCurator();
    const { SearchValue, Authors} = useSelector((state: RootState) => state.authors);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isCurator) {
            navigate(ROUTES.PAGE_403);
            return;
        }
        dispatch(getAuthorsList());
    }, [dispatch, isAuthenticated, navigate]);

    const setSearchValue = (value: string ) => {
        dispatch(setSearchValueAction(value))
    }

    return (
        <>
            <BasePage>
            
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.AUTHORS_CHANGE}]}></BreadCrumbs>
            <div className='d-flex flex-column'>
                <div className='ms-3 d-flex search_and_basket'>
                    <div className='d-flex flex-column justify-content-start w-75'>
                        <InputField value={SearchValue} setValue = {setSearchValue} valuetype='name' placeholder='ФИО или кафедра' inputClass='InputField' date={false} />
                        <Button className='mt-3 ms-3' variant='outline-danger' onClick={() => dispatch(getAuthorsList())} style={{ width: '100px' }}>Поиск</Button>
                    </div>

                </div>

                <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-wrap gap-5 ms-4 me-4 mt-5 w-100 pe-4' style={{maxWidth: '90%'}}>
                    {Authors.map((author: Author) => {
                        return (
                            <AuthorChangeCard
                                key={author.author_id}
                                id={author.author_id!}
                                name={author.name!}
                                description={author.description ?? ''}
                                birthdate={author.birthdate ?? ''}
                                imageUrl={author.url ?? ''}
                                department={author.department ?? ''}
                                status={author.status!}
                            ></AuthorChangeCard>
                        )
                    })}
                    <AuthorChangeCard></AuthorChangeCard>
                </div>
                
                </div>

            </div>
            </BasePage>
        </>
    )
}

export default AuthorsListPage