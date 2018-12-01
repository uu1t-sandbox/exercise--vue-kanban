import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

const App = {
  name: 'app',
  render: h => h('router-view')
}

const Top = {
  name: 'top',
  render: h => h('p', ['top'])
}

const Login = {
  name: 'login',
  render: h => h('p', ['login'])
}

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const setup = state => {
  const store = new Vuex.Store({ state })
  jest.doMock('@/store', () => store)

  const router = new VueRouter({
    routes: [
      {
        path: '/',
        component: Top,
        meta: { requiresAuth: true }
      },
      {
        path: '/login',
        component: Login
      }
    ]
  })

  const { authorizeToken } = require('@/router/guards')

  router.beforeEach(authorizeToken)

  return mount(App, {
    localVue,
    store,
    router
  })
}

describe('beforeEachガードフック', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('認証トークンあり', () => {
    it('そのまま解決すること', () => {
      const app = setup({
        auth: {
          token: '1234567890abcdef',
          userId: 1
        }
      })
      expect(app.text()).toBe('top')
    })
  })

  describe('認証トークンなし', () => {
    it('/login にリダイレクトして解決すること', () => {
      const app = setup({})
      expect(app.text()).toBe('login')
    })
  })
})
