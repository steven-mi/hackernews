import { mount } from '@vue/test-utils'
import Navbar from './Navbar'

describe('Given a navbar', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Navbar)
  })
  it('render buttons', () => {
    expect(wrapper.text()).toContain('Sign in')
    expect(wrapper.text()).toContain('Sign up')
  })
})

describe('Given a navbar and a authenticated user', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Navbar, {
      propsData: {
        isAuthenticated: true,
      },
    })
  })
  it('render buttons', () => {
    expect(wrapper.text()).toContain('Sign out')
  })
  describe('when pressing logout button', () => {
    beforeEach(() => {
      wrapper.find('a#a_logout').trigger('click')
    })
    it('logout method is emitted', () => {
      expect(wrapper.emitted('logout')).toBeTruthy()
    })
  })
})
