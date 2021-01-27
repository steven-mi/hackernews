import LoginFrom from './LoginForm.vue'

export default {
  title: 'Example/LoginFrom',
  component: LoginFrom,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LoginFrom },
  template: '<LoginFrom ></LoginFrom>',
})

export const WithEmptyItem = Template.bind({})
WithEmptyItem.args = {
  item: {},
}
