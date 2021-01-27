import { mount } from '@vue/test-utils'
import SignupForm from './SignupForm'

describe('Given a signup form', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(SignupForm)
  })
  it('render input form and buttons', () => {
    expect(wrapper.find('input#input_name')).toBeTruthy()
    expect(wrapper.find('input#input_email')).toBeTruthy()
    expect(wrapper.find('input#input_password')).toBeTruthy()
    expect(wrapper.text()).toContain('Sign up')
  })
  describe('when pressing signup button', () => {
    beforeEach(() => {
      wrapper.find('button#button_signup').trigger('click')
    })
    it('signup method is emitted', () => {
      expect(wrapper.emitted('signup')).toBeTruthy()
    })
  })
})
