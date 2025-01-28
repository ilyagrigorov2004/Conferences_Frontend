export const ROUTES = {
    HOME: '/',
    AUTHORS: '/authors'
}

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: 'Главная',
    AUTHORS: 'Авторы',
  };