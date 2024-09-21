export const unknownError = 'Se ha producido un error desconocido. Por favor, inténtelo de nuevo más tarde.'

export const redirects = {
  toLogin: '/signin',
  toSignup: '/signup',
  afterLogin: '/',
  afterLogout: '/',
  toVerify: '/verify-email',
  afterVerify: '/'
} as const
