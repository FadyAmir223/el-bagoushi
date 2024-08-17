const auth = '/auth'
const registerRoute = `${auth}/register`
const loginRoute = `${auth}/login`
const resetPasswordRoute = `${auth}/reset-password`
const newPasswordRoute = `${auth}/new-password`

const authRoutes = [registerRoute, loginRoute, resetPasswordRoute, newPasswordRoute]

const publicRoutesRegex = ['^/$', '^/robots.txt$', '^.*/sitemap.*.xml.*$']

const DEFAULT_LOGIN_REDIRECT = '/'

export {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  loginRoute,
  newPasswordRoute,
  publicRoutesRegex,
  registerRoute,
  resetPasswordRoute,
}
