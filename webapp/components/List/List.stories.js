import List from './List.vue'

export default {
  title: 'Example/List',
  component: List,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { List },
  template: '<List v-bind="$props"></List>',
})

export const WithEmptyList = Template.bind({})
WithEmptyList.args = {
  listItems: [],
}

export const WithList = Template.bind({})
WithList.args = {
  listItems: [
    {
      id: 0,
      title: 'post 1',
      votes: 0,
    },
    {
      id: 1,
      title: 'post 2',
      votes: 0,
    },
    {
      id: 2,
      title: 'post 3',
      votes: 1,
    },
  ],
}
