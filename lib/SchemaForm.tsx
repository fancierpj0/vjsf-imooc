import {defineComponent, PropType, provide, Ref, watch} from 'vue'

import {Schema, SchemaTypes, Theme} from "./types";
import SchemaItem from "./SchemaItem";
import {SchemaFormContextKey} from './context'

interface ContextRef {
  doValidate: () => {
    errors: any[],
    valid: boolean
  }
}

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
    }/*,
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }*/
    ,contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>
    }
  },
  setup(props, {slots, emit, attrs}) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context: any = {
      SchemaItem,
      // theme: props.theme
    }

    watch(()=>props.contextRef,()=>{
      if (props.contextRef) {
        props.contextRef.value = {
          doValidate(){
            console.log('---------------');
            return {
              valid: true,
              errors: []
            }
          }
        }
      }
    },{immediate:true})

    provide(SchemaFormContextKey, context) //provide的数据并不会自动变为响应式的 除非你讲其用reactive() 进行包裹

    return () => {
      const {schema, value} = props
      return <SchemaItem schema={schema} rootSchema={schema} value={value} onChange={handleChange}/>
    }
  }
})
