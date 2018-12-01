import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('foo@example.com', '12345678')
  }

  beforeEach(() => {
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }

    $router = {
      push: jest.fn()
    }

    actions = {
      login: jest.fn()
    }

    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('ログイン', () => {
    let loginView

    describe('成功', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('ボードページのルートにリダイレクトすること', async () => {
        actions.login.mockResolvedValue()

        triggerLogin(loginView, LoginFormComponentStub)

        await new Promise(resolve => {
          loginView.vm.$nextTick(resolve)
        })

        expect($router.push).toHaveBeenCalled()
        expect($router.push.mock.calls[0][0]).toHaveProperty('path', '/')
      })
    })

    describe('失敗', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })

        loginView.vm.throwReject = jest.fn()
      })

      it('エラー処理が呼び出されること', async () => {
        const message = 'login failed'
        actions.login.mockRejectedValue(new Error(message))

        triggerLogin(loginView, LoginFormComponentStub)

        await new Promise(resolve => {
          loginView.vm.$nextTick(resolve)
        })

        expect(loginView.vm.throwReject).toHaveBeenCalled()
        expect(loginView.vm.throwReject.mock.calls[0][0]).toHaveProperty(
          'message',
          message
        )
      })
    })
  })
})
