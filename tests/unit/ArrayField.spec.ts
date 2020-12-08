import {shallowMount, mount} from '@vue/test-utils'
import {defineComponent, h} from 'vue';

import JsonSchemaForm, {NumberField, StringField,ArrayField,SelectionWidget} from '../../lib'

describe('ArrayFiled', () => {
  it('should render multi type', () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string'
            },{
              type: 'number'
            }
          ]
        },
        value: [],
        onChange: () => {

        }
      }
    })

    const arr = wrapper.findComponent(ArrayField)
    const str = arr.findComponent(StringField)
    const num = arr.findComponent(NumberField)

    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })

  it('should render single type', () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        value: ['1','2'],
        onChange: () => {

        }
      }
    })

    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)

    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe("1")
  })

  it('should render enum type', () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              '1','2','3'
            ]
          }
        },
        value: [],
        onChange: () => {

        }
      }
    })

    const arr = wrapper.findComponent(ArrayField)
    const select = arr.findComponent(SelectionWidget)

    expect(select.exists()).toBeTruthy()
  })
});
