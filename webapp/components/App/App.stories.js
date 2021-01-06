import App from './App.vue'

export default {
  title: 'Example/App',
  component: App,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { App },
  template: '<App />',
})

export const standardApp = Template.bind({})
standardApp.args = {}
