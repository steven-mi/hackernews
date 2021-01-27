import SignupForm from './SignupForm.vue'

export default {
  title: 'Example/SignupForm',
  component: SignupForm,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SignupForm },
  template: '<SignupForm ></SignupForm>',
})

export const WithEmptyItem = Template.bind({})
WithEmptyItem.args = {
  item: {},
}
