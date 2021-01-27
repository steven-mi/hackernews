import Logo from './Logo.vue'

export default {
  title: 'Example/Logo',
  component: Logo,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Logo },
  template: '<Logo ></Logo>',
})

export const WithEmptyItem = Template.bind({})
WithEmptyItem.args = {}
