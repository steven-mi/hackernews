import BasicInput from './BasicInput.vue'

export default {
  title: 'Example/BasicInput',
  component: BasicInput,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BasicInput },
  template: '<BasicInput />',
})

export const standardBasicInput = Template.bind({})
standardBasicInput.args = {}
