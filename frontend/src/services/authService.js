import api from './api'

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password })

    if (response.data.token) {
      localStorage.setItem('token', response.data.token)

      // Decode the JWT client-side for UI purposes only.
      // The backend verifies the signature on every API request.
      try {
        const payload = JSON.parse(atob(response.data.token.split('.')[1]))
        const user = { id: payload.userId, role: payload.role, email }
        localStorage.setItem('user', JSON.stringify(user))
      } catch {
        console.error('Failed to decode token')
      }
    }

    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/register', userData)

    if (response.data.userId) {
      await authService.login(userData.email, userData.password)
    }

    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')

    if (!userStr || userStr === 'undefined' || userStr === 'null') {
      return null
    }

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  isAdmin: () => {
    const user = authService.getCurrentUser()
    return user?.role === 'admin'
  },
}
