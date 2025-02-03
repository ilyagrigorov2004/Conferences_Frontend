export const ROUTES = {
    HOME: '/',
    AUTHORS: '/authors',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    ACCOUNT: '/account',
    CONFERENCES: '/conferences',
    PAGE_404: '/404',
    PAGE_403: '/403',
    AUTHORS_CHANGE: '/authors_change',
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    AUTHORS: 'Авторы',
    LOGIN: 'Вход',
    REGISTRATION: 'Регистрация',
    ACCOUNT: 'Аккаунт',
    CONFERENCES: 'Конференции',
    PAGE_404: 'Страницы не существует',
    PAGE_403: 'Доступ запрещен',
    AUTHORS_CHANGE: 'Изменение авторов',
    
  };