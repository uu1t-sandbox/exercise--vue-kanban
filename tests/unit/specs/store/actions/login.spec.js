import Vue from 'vue'

import * as types from '@/store/mutation-types'
import actions from '@/store/actions'
import Auth from '@/api/auth'

jest.mock('@/api/auth')

describe('loginアクション', () => {
  const address = 'foo@example.com'
  const password = '12345678'
  let commit
  let future

  describe('Auth.loginが成功', () => {
    const token = '1234567890abcedr'
    const userId = 1

    beforeEach(async () => {
      Auth.login.mockResolvedValue({ token, userId })
      commit = jest.fn()
      future = actions.login({ commit }, { address, password })

      await new Promise(resolve => {
        Vue.nextTick(resolve)
      })
    })

    it('成功となること', () => {
      expect(commit).toHaveBeenCalled()
      expect(commit.mock.calls[0][0]).toBe(types.AUTH_LOGIN)
      expect(commit.mock.calls[0][1]).toHaveProperty('token', token)
      expect(commit.mock.calls[0][1]).toHaveProperty('userId', userId)
    })
  })

  describe('Auth.loginが失敗', () => {
    beforeEach(async () => {
      Auth.login.mockRejectedValue(new Error('login failed'))
      commit = jest.fn()
      future = actions.login({ commit })

      await new Promise(resolve => {
        Vue.nextTick(resolve)
      })
    })

    it('失敗となること', async () => {
      expect(commit).not.toHaveBeenCalled()
      try {
        await future
      } catch (err) {
        expect(err).toHaveProperty('message', 'login failed')
      }
    })
  })
})
