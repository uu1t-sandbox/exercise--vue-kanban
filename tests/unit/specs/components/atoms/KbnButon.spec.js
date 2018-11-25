import { mount } from '@vue/test-utils'

import KbnButton from '@/components/atoms/KbnButton.vue'

describe('KbnButton', () => {
  describe('props', () => {
    describe('type', () => {
      describe('default', () => {
        it('kbn-buttonクラスを持つbutton要素で構成されること', () => {
          const button = mount(KbnButton)
          expect(button.is('button')).toBe(true)
          expect(button.classes()).toContain('kbn-button')
        })
      })

      describe('button', () => {
        it('kbn-buttonクラスを持つbutton要素で構成されること', () => {
          const button = mount(KbnButton, {
            propsData: { type: 'button' }
          })
          expect(button.is('button')).toBe(true)
          expect(button.classes()).toContain('kbn-button')
        })
      })

      describe('text', () => {
        it('kbn-button-textクラスを持つbutton要素で構成されること', () => {
          const button = mount(KbnButton, {
            propsData: { type: 'text' }
          })
          expect(button.is('button')).toBe(true)
          expect(button.classes()).toContain('kbn-button-text')
        })
      })
    })

    describe('disabled', () => {
      describe('default', () => {
        it('disabled属性が付与されていないこと', () => {
          const button = mount(KbnButton)
          expect(button.attributes()).not.toHaveProperty('disabled')
        })
      })

      describe('true', () => {
        it('disabled属性が付与されていること', () => {
          const button = mount(KbnButton, {
            propsData: { disabled: true }
          })
          expect(button.attributes()).toHaveProperty('disabled', 'disabled')
        })
      })

      describe('false', () => {
        it('disabled属性が付与されていること', () => {
          const button = mount(KbnButton, {
            propsData: { disabled: false }
          })
          expect(button.attributes()).not.toHaveProperty('disabled')
        })
      })
    })
  })

  describe('event', () => {
    describe('click', () => {
      it('発行されていること', () => {
        const button = mount(KbnButton)
        button.trigger('click')
        expect(button.emitted().click).toHaveLength(1)
      })
    })
  })

  describe('slot', () => {
    describe('コンテンツ挿入あり', () => {
      it('挿入されていること', () => {
        const button = mount(KbnButton, {
          slots: { default: '<p>Hello</p>' }
        })
        expect(button.text()).toBe('Hello')
      })
    })

    describe('コンテンツ挿入なし', () => {
      it('挿入されていないこと', () => {
        const button = mount(KbnButton)
        expect(button.text()).toBe('')
      })
    })
  })
})
