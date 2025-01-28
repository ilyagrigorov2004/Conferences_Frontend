
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthorPage from './pages/AuthorPage';
import AuthorsPage from './pages/AuthorsPage';
import { ROUTES } from './modules/Routes';

function App() {


return (
  <BrowserRouter basename='/Conferences_Frontend'>
    <Routes>
      <Route path={ROUTES.HOME} index element={<MainPage />} />
      <Route path={ROUTES.AUTHORS} element={<AuthorsPage />} />
      <Route path={ROUTES.AUTHORS + "/:id"} element={<AuthorPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
