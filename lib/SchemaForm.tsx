import {defineComponent, PropType, provide, Ref, watch, shallowRef, watchEffect} from 'vue'
import Ajv, { Options } from 'ajv';

import {Schema, SchemaTypes, Theme} from "./types";
import SchemaItem from "./SchemaItem";
import {SchemaFormContextKey} from './context'
import {ErrorSchema, validateFormData} from './validator'

interface ContextRef {
  doValidate: () => {
    errors: any[],
    valid: boolean
  }
}

const defaultAjvOptions: Options = {
  allErrors: true,
  jsonPointers: true
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
    ,ajvOptions: {
      type: Object as PropType<Options>
    }
    ,locale: {
      type: String,
      default: 'zh'
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

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({}) //验证结果每次校验都会重新生成,所以我们不需要考虑它里面的key去变化的情况,只需要考虑它整体变化的情况就可以了

    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any

    watchEffect(()=>{
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
      })
    })

    watch(()=>props.contextRef,()=>{
      if (props.contextRef) {
        props.contextRef.value = {
          doValidate(){
            console.log('---------------');

            // const valid = validatorRef.value.validate(props.schema, props.value) as boolean
            const result = validateFormData(validatorRef.value,props.value,props.schema,props.locale)

            errorSchemaRef.value = result.errorSchema

            return result
          }
        }
      }
    },{immediate:true})

    provide(SchemaFormContextKey, context) //provide的数据并不会自动变为响应式的 除非你讲其用reactive() 进行包裹

    return () => {
      const {schema, value} = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
        />
      )
    }
  }
})
