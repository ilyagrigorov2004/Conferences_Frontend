export const ROUTES = {
    HOME: '/',
    AUTHORS: '/authors',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    ACCOUNT: '/account',
    CONFERENCES: '/conferences',
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    AUTHORS: 'Авторы',
    LOGIN: 'Вход',
    REGISTRATION: 'Регистрация',
    ACCOUNT: 'Аккаунт',
    CONFERENCES: 'Конференции',
    
  };