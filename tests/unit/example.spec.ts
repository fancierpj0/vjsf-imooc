import { shallowMount, mount} from '@vue/test-utils'
import { defineComponent, h } from 'vue';

import JsonSchemaForm,{NumberField} from '../../lib'

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props:{
    msg: String
  },
  setup(props){
    return () => {
      return h('div',props.msg)
    };
  }
})

//每个it执行之前执行
/*beforeEach(()=>{
  console.log('before each');
})*/

//每个it执行之后执行
/*afterEach(()=>{
  console.log('after each');
})*/

//所有it执行之前执行
/*beforeAll(()=>{
  console.log('before All');
})*/

//所有it执行之后执行
/*
afterAll(()=>{
  console.log('after All');
})
*/

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: {msg},
    });

    //todo vue中更新props,更新到dom上的过程其实是异步的
    await wrapper.setProps({
      msg: '123'
    });

    expect(wrapper.text()).toMatch('123')

  });

  it('should work',()=>{
    expect(1+1).toBe(2)
  });
});


describe('JsonSchemaForm',()=>{
  it('should render correct number field', async () => {
    let value = '';
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number'
        },
        value,
        onChange: (v) => {
          value = v
        }
      }
    });

    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy();

    //如果不考虑numberField具体实现 可以直接这样
    //await numberField.props('onChange')(123)
    //
    //如果要考虑内部实现↓
    const input = numberField.find('input');
    input.element.value = '123';
    input.trigger('input');

    expect(value).toBe(123)
  });
})
