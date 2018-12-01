import mutations from '@/store/mutations'

describe('AUTH_LOGINミューテーション', () => {
  it('ミューテーションのペイロード地が状態authに設定されること', () => {
    const state = {}

    const token = '1234567890abcdef'
    const userId = 1
    mutations.AUTH_LOGIN(state, { token, userId })

    expect(state.auth).toHaveProperty('token', token)
    expect(state.auth).toHaveProperty('userId', userId)
  })
})
