import { shallowMount, mount} from '@vue/test-utils'
import { defineComponent, h } from 'vue';

import JsonSchemaForm,{NumberField,StringField} from '../../lib'

describe('ObjectField',()=>{
  let schema:any
  beforeEach(() => {
    schema = {
      type: 'object',
        properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
    }
  });

  it('should render properties to correct fields', async () => {
    let value:any = {
      name: '123'
    };

    const wrapper = mount(JsonSchemaForm,{
      props: {
        schema,
        value : value,
        onChange: (v) => {value=v}
      }
    })

    const strField = wrapper.findComponent(StringField)
    const numberField = wrapper.findComponent(NumberField)
    expect(strField.exists()).toBeTruthy()
    expect(numberField.exists()).toBeTruthy()

    await strField.props('onChange')(undefined)
    expect(value.name).toBeUndefined();
  });

  it('should change value when sub fields trigger onChange', async () => {
    let value:any = {};

    const wrapper = mount(JsonSchemaForm,{
      props: {
        schema,
        value,
        onChange: (v) => {
          value = v
        }
      }
    })

    const strField = wrapper.findComponent(StringField)
    const numberField = wrapper.findComponent(NumberField)

    await strField.props('onChange')('1')
    await numberField.props('onChange')(2)

    expect(value.name).toEqual('1')
    expect(value.age).toEqual(2)
  });
})
