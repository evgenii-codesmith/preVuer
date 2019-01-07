import { mount } from '@vue/test-utils'
import ComponentlistItem from '@/components/LeftContainer/ComponentListItem.vue'

describe('ComponentListItem', () => {
  it('renders options using a mock store', () => {
    const wrapper = mount(ComponentlistItem, {
      mocks: {
        $store: { 
          getters: {
            getComponents: [
              {title: 'Component1'},
              {title: 'Component2'},
              {title: 'Component3'},
            ]
          }
        }
      },
      propsData: {
        component : {
          title: 'ComponentTitle'
        }
      }
    })
  console.log(wrapper.html());
  expect(wrapper.findAll('option').length).toBe(4)
  })
})