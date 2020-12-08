import {defineComponent, PropType, provide} from 'vue'

import {Schema, SchemaTypes} from "./types";
import SchemaItem from "./SchemaItem";
import {SchemaFormContextKey} from './context'

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props, {slots, emit, attrs}) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context: any = {
      SchemaItem
    }

    provide(SchemaFormContextKey, context) //provide的数据并不会自动变为响应式的 除非你讲其用reactive() 进行包裹

    let index = 1;
    setInterval(() => {
      context.SchemaItem = index++
    }, 500)

    return () => {
      const {schema, value} = props
      return <SchemaItem schema={schema} rootSchema={schema} value={value} onChange={handleChange}/>
    }
  }
})
