import {mount} from '@vue/test-utils'
import App from './App'

describe('Given a non empty list of items and descending order', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(App, {
            data() {
                return {
                    news: [
                        {
                            id: 0,
                            title: 'post 2',
                            votes: 2
                        },
                        {
                            id: 1,
                            title: 'post 1',
                            votes: 3
                        },
                        {
                            id: 2,
                            title: 'post 3',
                            votes: 1
                        }
                    ],
                    descending: true,
                }
            }
        });
    });
    it('does not render empty state', () => {
        !expect(wrapper.text()).not.toContain('The list is empty :(');
    })
    describe('when calling sort property', () => {
        beforeEach(() => {
            wrapper.vm.sortedNews
        });
        it('list items should be descending', () => {
            expect(wrapper.text()).toMatch(/post 1.*post 2.*post 3/);
            expect(wrapper.text()).not.toMatch(/post 1.*post 3.*post 2/);
            expect(wrapper.text()).not.toMatch(/post 2.*post 3.*post 1/);
            expect(wrapper.text()).not.toMatch(/post 2.*post 1.*post 3/);
            expect(wrapper.text()).not.toMatch(/post 3.*post 1.*post 2/);
            expect(wrapper.text()).not.toMatch(/post 3.*post 2.*post 1/);
        })
    });
})

describe('Given a non empty list of items and ascending order', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(App, {
            data() {
                return {
                    news: [
                        {
                            id: 0,
                            title: 'post 1',
                            votes: 3
                        },
                        {
                            id: 1,
                            title: 'post 2',
                            votes: 2
                        },
                        {
                            id: 2,
                            title: 'post 3',
                            votes: 1
                        }
                    ],
                    descending: false,
                }
            }
        });
    });
    it('does not render empty state', () => {
        !expect(wrapper.text()).not.toContain('The list is empty :(');
    })
    describe('when calling sort property', () => {
        beforeEach(() => {
            wrapper.vm.sortedNews
        });
        it('list items should be ascending', () => {
            expect(wrapper.text()).not.toMatch(/post 1.*post 2.*post 3/);
            expect(wrapper.text()).not.toMatch(/post 1.*post 3.*post 2/);
            expect(wrapper.text()).not.toMatch(/post 2.*post 3.*post 1/);
            expect(wrapper.text()).not.toMatch(/post 2.*post 1.*post 3/);
            expect(wrapper.text()).not.toMatch(/post 3.*post 1.*post 2/);

            expect(wrapper.text()).toMatch(/post 3.*post 2.*post 1/);
        })
    });
})