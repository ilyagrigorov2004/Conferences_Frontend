import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/mainstyles.css'
import AuthorsPage from './pages/AuthorsPage'
import MainPage from './pages/MainPage'
import AuthorPage from './pages/AuthorPage'
import { ROUTES } from './modules/Routes'
import { store } from './store'
import { Provider } from "react-redux";
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App/>
  </Provider>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
  })
}