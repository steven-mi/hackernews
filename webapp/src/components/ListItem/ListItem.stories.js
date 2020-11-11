import ListItem from './ListItem.vue';

export default {
    title: 'Example/ListItem',
    component: ListItem,
};

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {ListItem},
    template:
        '<ListItem v-bind="$props"></ListItem>',
});

export const WithEmptyItem = Template.bind({});
WithEmptyItem.args = {
    item: {},
};

export const WithItem = Template.bind({});
WithItem.args = {
    item:
        {
            id: 0,
            title: 'post 1',
            votes: 0
        },
};