import { mount } from '@vue/test-utils'
import ListItem from './ListItem'

describe('Given a item', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ListItem, {
      propsData: {
        item: { id: '1', title: 'Foo', votes: 0, isOwner: true },
        isAuthenticated: true,
      },
    })
  })
  it('render item attributes', () => {
    expect(wrapper.text()).toContain('Foo')
    expect(wrapper.text()).toContain('0')
  })
  it('render upvote, downvote and delete buttons', () => {
    expect(wrapper.text()).toContain('Upvote')
    expect(wrapper.text()).toContain('Downvote')
    expect(wrapper.text()).toContain('Remove')
  })
})
