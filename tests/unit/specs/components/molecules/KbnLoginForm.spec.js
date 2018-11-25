import { mount } from '@vue/test-utils'

import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue'

describe('KbnLoginForm', () => {
  describe('computed', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('validation.email.requiredがinvalidであること', () => {
              loginForm.setData({ email: '' })
              expect(loginForm.vm.validation.email.required).toBe(false)
            })
          })

          describe('入力あり', () => {
            it('validation.email.requiredがvalidであること', () => {
              loginForm.setData({ email: 'foo@example.com' })
              expect(loginForm.vm.validation.email.required).toBe(true)
            })
          })
        })

        describe('format', () => {
          describe('メールアドレス形式でないフォーマット', () => {
            it('validation.email.formatがinvalidであること', () => {
              loginForm.setData({ email: 'foobar' })
              expect(loginForm.vm.validation.email.format).toBe(false)
            })
          })

          describe('メールアドレス形式のフォーマット', () => {
            it('validation.email.formatがvalidであること', () => {
              loginForm.setData({ email: 'foo@example.com' })
              expect(loginForm.vm.validation.email.format).toBe(true)
            })
          })
        })
      })

      describe('password', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('validation.password.requiredがinvalidであること', () => {
              loginForm.setData({ password: '' })
              expect(loginForm.vm.validation.password.required).toBe(false)
            })
          })

          describe('入力あり', () => {
            it('validation.password.requiredがvalidであること', () => {
              loginForm.setData({ password: 'xxxx' })
              expect(loginForm.vm.validation.password.required).toBe(true)
            })
          })
        })
      })
    })

    describe('valid', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('バリデーション項目全てOK', () => {
        it('validになること', () => {
          loginForm.setData({
            email: 'foo@example.com',
            password: '12345678'
          })
          expect(loginForm.vm.valid).toBe(true)
        })
      })

      describe('バリデーションNG項目あり', () => {
        it('invalidになること', () => {
          loginForm.setData({
            email: 'foo@example.com',
            password: ''
          })
          expect(loginForm.vm.valid).toBe(false)
        })
      })
    })

    describe('loginActionDisabled', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('バリデーションNG項目あり', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'foo@example.com',
            password: ''
          })
          expect(loginForm.vm.loginActionDisabled).toBe(true)
        })
      })

      describe('バリデーション項目全てOKでかつログイン処理中ではない', () => {
        it('ログイン処理は有効', () => {
          loginForm.setData({
            email: 'foo@example.com',
            password: '12345678'
          })
          expect(loginForm.vm.loginActionDisabled).toBe(false)
        })
      })

      describe('バリデーション項目全てOKでかつログイン処理中', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'foo@example.com',
            password: '12345678',
            progress: true
          })
          expect(loginForm.vm.loginActionDisabled).toBe(true)
        })
      })
    })
  })

  describe('props', () => {
    let loginForm
    let onloginStub
    beforeEach(done => {
      onloginStub = jest.fn()
      loginForm = mount(KbnLoginForm, {
        propsData: { onlogin: onloginStub }
      })
      loginForm.setData({
        email: 'foo@example.com',
        password: '12345678'
      })
      loginForm.vm.$nextTick(done)
    })

    describe('resolve', () => {
      it('resolveされること', async () => {
        onloginStub.mockResolvedValue()

        loginForm.find('button').trigger('click')
        expect(onloginStub.mock.calls).toHaveLength(0)
        expect(loginForm.vm.error).toBe('')
        expect(loginForm.vm.loginActionDisabled).toBe(true)

        await new Promise(resolve => {
          loginForm.vm.$nextTick(resolve)
        })

        expect(onloginStub.mock.calls).toHaveLength(1)
        const authInfo = onloginStub.mock.calls[0][0]
        expect(authInfo.email).toBe('foo@example.com')
        expect(authInfo.password).toBe('12345678')

        await new Promise(resolve => {
          loginForm.vm.$nextTick(resolve)
        })

        expect(loginForm.vm.error).toBe('')
        expect(loginForm.vm.loginActionDisabled).toBe(false)
      })
    })

    describe('reject', () => {
      it('rejectされること', async () => {
        onloginStub.mockRejectedValue(new Error('login error!'))

        loginForm.find('button').trigger('click')
        expect(onloginStub.mock.calls).toHaveLength(0)
        expect(loginForm.vm.error).toBe('')
        expect(loginForm.vm.loginActionDisabled).toBe(true)

        await new Promise(resolve => {
          loginForm.vm.$nextTick(resolve)
        })

        expect(onloginStub.mock.calls).toHaveLength(1)
        const authInfo = onloginStub.mock.calls[0][0]
        expect(authInfo.email).toBe('foo@example.com')
        expect(authInfo.password).toBe('12345678')

        await new Promise(resolve => {
          loginForm.vm.$nextTick(resolve)
        })

        expect(loginForm.vm.error).toBe('login error!')
        expect(loginForm.vm.loginActionDisabled).toBe(false)
      })
    })
  })
})
