import { FC, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import BasePage from './BasePage'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getConferences, setSearchConferencesValues, useConfSearchValues, useConferences } from '../slices/conferencesSlice'
import { ROUTES, ROUTE_LABELS } from '../modules/Routes'
import { BreadCrumbs } from '../components/BreadCrumbs'
import { AppDispatch } from '../store'
import InputField from '../components/InputField'
import ConferenceCard from '../components/ConferenceCard'
import { useIsAuthenticated, useIsCurator } from '../slices/userSlice'

const ConferencesPage: FC = () => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const conferences = useConferences();
    const ConfSearchValues = useConfSearchValues() ;
    const isAuthenticated = useIsAuthenticated();
    const isCurator = useIsCurator();
    

    useEffect(() => {      
        if (!isAuthenticated) {
            navigate(ROUTES.PAGE_403);
            return;
        }
        const intervalId = setInterval(() => {
            dispatch(getConferences())
        }, 2000) // Polling every 2 seconds
        return () => clearInterval(intervalId)
    },[dispatch])

    useEffect(() => {
        dispatch(getConferences())
    },[])
    
    const getStatustranslate = (status_text: string | undefined) => {
        switch (status_text) {
            case 'draft': return 'Черновая'
            case 'deleted': return 'Удалена'
            case 'formed': return 'Сформирована'
            case 'confirmed': return 'Утверждена'
            case 'rejected': return 'Отклонена'
            default: return 'Неизвестный статус'
        }
    }

    const setSearchValue = (val: { [key: string]: string }) => {
        dispatch(setSearchConferencesValues(val))
    }

    const filterConferencesByCreator = () => {
        if (!Array.isArray(conferences)) return [];
        const filteredConferences = conferences.filter(conf => 
            conf.creator.toLowerCase().includes(ConfSearchValues.creator.toLowerCase())
        )
        return filteredConferences;    
    }

    return (
        <BasePage>
            <BreadCrumbs crumbs={[
                    {
                        label: ROUTE_LABELS.CONFERENCES
                    }
            ]}></BreadCrumbs>
            <div className='container-fluid d-flex flex-column justify-content-center mt-5 border shadow shadow-bg p-3'>
                <h3>Конференции</h3>
                <div className='d-flex flex-column justify-content-start w-75 mb-4'>
                    <select 
                        value={ConfSearchValues.status} 
                        onChange={(e) => setSearchValue({ status: e.target.value })} 
                        className='form-select mb-3 w-50'
                    >
                        <option value=''>Выберите статус</option>
                        <option value='formed'>Сформирована</option>
                        <option value='confirmed'>Подтверждена</option>
                        <option value='rejected'>Отклонена</option>
                    </select>
                    <h5>Фильтр по дате формирования:</h5>
                    <div className='d-flex gap-3 mb-1'>
                    <div style={{ width: '20%' }}>Минимальная дата:</div>
                    <InputField value={ConfSearchValues.min_date_formed} setValue={(value, valuetype) => setSearchValue({ [valuetype!]: value })} valuetype='min_date_formed' placeholder='Минимальная дата' inputClass='InputField' date={true}/>
                    </div>
                    <div className='d-flex gap-3'>
                    <div style={{ width: '20%' }}>Максимальная дата:</div>
                    <InputField value={ConfSearchValues.max_date_formed} setValue={(value, valuetype) => setSearchValue({ [valuetype!]: value })} valuetype='max_date_formed' placeholder='Максимальная дата' inputClass='InputField' date={true}/>
                    </div>
                    {isCurator && (
                        <>
                            <h5>Фильтр по организатору:</h5>
                            <div className='d-flex gap-3'>
                                <div style={{ width: '20%' }}>Имя организатора:</div>
                                <InputField value={ConfSearchValues.creator} setValue={(value, valuetype) => setSearchValue({ [valuetype!]: value })} valuetype='creator' placeholder='Организатор' inputClass='InputField' date={false}/>
                            </div>
                        </>
                    )}
                    <Button className='mt-3 ms-3 my-btn'  onClick={() => dispatch(getConferences())} style={{ width: '100px' }}>Поиск</Button>
                </div>
                <div className='d-flex flex-column gap-3'>
                    {filterConferencesByCreator()?.length === 0 ? <h5>Конференции не найдены</h5> : filterConferencesByCreator()?.map((conference) => {
                        return (
                            <ConferenceCard 
                                key={conference.conference_id}
                                conference_id={conference.conference_id} 
                                status={getStatustranslate(conference.status)} 
                                date_created={conference.date_created ? new Date(conference.date_created).toLocaleDateString('ru-RU') : '-'}  
                                date_formed={conference.date_formed ? new Date(conference.date_formed).toLocaleDateString('ru-RU') : '-'} 
                                date_ended={conference.date_ended ? new Date(conference.date_ended).toLocaleDateString('ru-RU') : '-'} 
                                creator={conference.creator}
                                moderator={conference.moderator}
                                members_count={conference.members_count}
                                review_result={conference.review_result}
                                conf_start_date={conference.conf_start_date ? new Date(conference.conf_start_date).toLocaleString('ru-RU') : '-'}
                                conf_end_date={conference.conf_end_date ? new Date(conference.conf_end_date).toLocaleString('ru-RU') : '-'}
                                qr = {conference.qr as string}>
                            </ConferenceCard>
                        )
                    })}
                </div>
            </div>
        </BasePage>
    )
}

export default ConferencesPage