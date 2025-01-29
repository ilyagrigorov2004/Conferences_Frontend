import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from './modules/Routes'
import MainPage from './pages/MainPage';
import AuthorsPage from './pages/AuthorsPage';
import AuthorPage from './pages/AuthorPage';
import LoginPage from './pages/LoginPage';
import ConferencePage from './pages/ConferencePage';
import RegistrationPage from './pages/RegistrationPage';
import LKPage from './pages/LKPage';
import ConferencesPage from './pages/ConferencesPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<MainPage />} />
          <Route path={ROUTES.AUTHORS} element={<AuthorsPage />} />
          <Route path={ROUTES.AUTHORS + "/:id"} element={<AuthorPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.CONFERENCES + "/:id"} element={<ConferencePage />} />
          <Route path={ROUTES.CONFERENCES} element={<ConferencesPage />} />
          <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
          <Route path={ROUTES.ACCOUNT} element={<LKPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
