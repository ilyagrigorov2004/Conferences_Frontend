import { FC, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

import NavigationBar from '../components/NavBar'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setError } from '../slices/userSlice'

interface Props {
    children: React.ReactNode
}

const BasePage: FC<Props> = ({ children }) => {

    const error = useSelector((state: RootState) => 
        state.user.error || 
        state.authors.error || 
        state.conference.error 
    );

    const loaderStatus = useSelector((state: RootState) => 
        state.conference.loading || 
        state.authors.loading ||
        state.user.loading
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(setError(''));
            }, 5000);
        }
    });

    return (
        <>
            {error && <Alert variant="danger" style={{ width: '15vw', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>{error}</Alert>}
            <Loader visible={loaderStatus}></Loader>
            <NavigationBar></NavigationBar>
            {children}
        </>
    )
}

export default BasePage