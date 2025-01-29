
import './App.css'

import { useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthorPage from './pages/AuthorPage';
import AuthorsPage from './pages/AuthorsPage';
import { ROUTES } from './modules/Routes';

function App() {
  useEffect(() => {
    invoke('tauri', {cmd: 'create'})
    .then((response: any) => console.log(response))
    .catch((error: any) => console.log(error))

    return () => {
      invoke('tauri', {cmd: 'close'})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
    }
  }, [])

return (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.HOME} index element={<MainPage />} />
      <Route path={ROUTES.AUTHORS} element={<AuthorsPage />} />
      <Route path={ROUTES.AUTHORS + "/:id"} element={<AuthorPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
