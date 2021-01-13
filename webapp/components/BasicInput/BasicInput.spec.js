import { mount } from '@vue/test-utils'
import BasicInput from './BasicInput'

describe('Given a create form', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(BasicInput)
  })
  it('render input form and buttons', () => {
    expect(wrapper.find('input#input_title')).toBeTruthy()
    expect(wrapper.text()).toContain('Create')
  })
  describe('when pressing create button', () => {
    beforeEach(() => {
      wrapper.find('button#button_create').trigger('click')
    })
    it('create method is emitted', () => {
      expect(wrapper.emitted('create-item')).toBeTruthy()
    })
  })
})
