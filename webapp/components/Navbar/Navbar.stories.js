import Navbar from './Navbar.vue'

export default {
  title: 'Example/Navbar',
  component: Navbar,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Navbar },
  template: '<Navbar ></Navbar>',
})

export const WithEmptyItem = Template.bind({})
WithEmptyItem.args = {}
