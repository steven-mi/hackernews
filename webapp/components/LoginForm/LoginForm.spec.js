import { mount } from '@vue/test-utils'
import LoginForm from './LoginForm'

describe('Given a login form', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(LoginForm)
  })
  it('render input form and buttons', () => {
    expect(wrapper.find('input#input_email')).toBeTruthy()
    expect(wrapper.find('input#input_password')).toBeTruthy()
    expect(wrapper.text()).toContain('Login')
  })
  describe('when pressing login button', () => {
    beforeEach(() => {
      wrapper.find('button#button_login').trigger('click')
    })
    it('login method is emitted', () => {
      expect(wrapper.emitted('login')).toBeTruthy()
    })
  })
})
