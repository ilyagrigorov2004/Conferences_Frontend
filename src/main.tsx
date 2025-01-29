import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthorsPage from './pages/AuthorsPage'
import MainPage from './pages/MainPage'
import AuthorPage from './pages/AuthorPage'
import { ROUTES } from './modules/Routes'
import { store } from './store'
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainPage />
  },
  {
    path: ROUTES.AUTHORS,
    element: <AuthorsPage />
  },
  {
    path: `${ROUTES.AUTHORS}/:id`,
    element: <AuthorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
  })
}