import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import { mount, createLocalVue } from '@vue/test-utils'
import LeftContainer from '@/containers/LeftContainer.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueMaterial)

const store = new Vuex.Store({
  getters: {
    getCurrentText: () => 'CurrentText from localVuexStoreGetters'
  }
})

describe('LeftContainer', () => {
  it('renders md-input with the correct text using localVuexStore', () => {
    const wrapper = mount(LeftContainer, {
      store,
      localVue
    });
  console.log(wrapper.html());
  expect(wrapper.find('#input-text-button-pair').html().includes('<md-input value="Currenttext from localVuexStoreGetters"></md-input>'));
  })
})