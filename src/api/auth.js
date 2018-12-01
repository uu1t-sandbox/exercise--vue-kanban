import asiox from 'axios'

export default {
  login: async authInfo => {
    try {
      const res = await asiox.post('/auth/login', authInfo)
      return {
        token: res.data.token,
        userId: res.data.userId
      }
    } catch (err) {
      throw new Error(err.response.data.message || err.message)
    }
  }
}
