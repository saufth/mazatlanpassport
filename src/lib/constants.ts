export const unknownError = 'Se ha producido un error desconocido. Por favor, inténtelo de nuevo más tarde.'

export const redirects = {
  toSignin: '/signin',
  toSignup: '/signup',
  afterLogin: '/',
  afterLogout: '/',
  toVerify: '/verify-email',
  afterVerify: '/'
} as const

export const roles = {
  user: 'user',
  admin: 'admin',
  root: 'root'
} as const

export const userStatus = {
  notFound: 'La cuenta no existe',
  inactive: 'Cuenta inactiva',
  blocked: 'Cuanta bloqeada',
  unverified: 'Cuenta no verificada'
} as const
