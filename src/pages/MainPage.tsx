import { FC } from 'react'
import NavigationBar from '../components/NavBar'
import '../assets/css/fonts.css'


const MainPage: FC = () => {

    return (
        <>
            <NavigationBar></NavigationBar>
            <div className='container d-flex flex-column justify-content-center mt-5 p-3 w-75'>
                <h3 className='text-center'style={{ fontFamily: 'Ro' }}>Конференции МГТУ</h3>
                <div className='d-flex flex-column mt-5' style={{ fontFamily: 'Roboto' }}>
                    <p>Добро пожаловать на страницу конференций МГТУ им. Н.Э.Баумана!</p>
                    <p>На нашем сайте вы найдете информацию о предстоящих конференциях, а также о выступающих на наших конференция авторах.</p>
                </div>
            </div>
        </>
    )
}

export default MainPage