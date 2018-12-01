import axios from 'axios'
import Auth from '@/api/auth'

jest.mock('axios')

describe('Auth APIモジュール', () => {
  describe('login', () => {
    const token = '1234567890abcedf'
    const userId = 1
    const address = 'foo@example.com'
    const password = '12345678'

    describe('成功', () => {
      it('token, userIdが取得できること', async () => {
        axios.post.mockResolvedValue({ data: { token, userId } })

        const res = await Auth.login({ address, password })
        expect(res).toHaveProperty('token', token)
        expect(res).toHaveProperty('userId', userId)
      })
    })

    describe('失敗', () => {
      it('エラーメッセージを取得できること', async () => {
        const message = 'failed login'

        const err = new Error(message)
        err.response = { data: { message }, status: 401 }
        axios.post.mockRejectedValue(err)

        try {
          await Auth.login({ address, password })
        } catch (err) {
          expect(err).toHaveProperty('message', message)
        }
      })
    })
  })
})
