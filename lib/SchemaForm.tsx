import {defineComponent, PropType, provide, Ref, watch, shallowRef, watchEffect, ref, computed} from 'vue'
import Ajv, { Options } from 'ajv';

import {CommonWidgetDefine, CustomFormat, Schema, SchemaTypes, Theme, UISchema} from "./types";
import SchemaItem from "./SchemaItem";
import {SchemaFormContextKey} from './context'
import {ErrorSchema, validateFormData} from './validator'

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[],
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
  //jsonPointers: true // 和validators.ts 里的 lodash.toPath冲突
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
    ,customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>
    }
    ,uiSchema: {
      type: Object as PropType<UISchema>
    }
    ,customFormats: {
      type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>
    }
  },
  setup(props, {slots, emit, attrs}) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const formatMapRef = computed(()=>{
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)? props.customFormats: [props.customFormats]

        return customFormats.reduce((result,format)=>{
          //validatorRef.value.addFormat(format.name,format.definition)
          result[format.name] = format.component
          return result
        },{} as {[key: string]: CommonWidgetDefine})

      }else {
        return {}
      }
    })

    const context: any = {
      SchemaItem,
      // theme: props.theme

      formatMapRef
    }

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({}) //验证结果每次校验都会重新生成,所以我们不需要考虑它里面的key去变化的情况,只需要考虑它整体变化的情况就可以了

    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any

    watchEffect(()=>{
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
      })

      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)? props.customFormats: [props.customFormats]
        customFormats.forEach(format=>{
          validatorRef.value.addFormat(format.name,format.definition)
        })
      }
    })

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    //点击校验按钮过后,在异步校验的过程中,还没拿到最终的结果之前
    //每次值改变都会重新进行校验
    watch(()=>props.value,()=>{
      if(validateResolveRef.value){
        doValidate()
      }
    },{deep: true})

    async function doValidate(){
      console.log('start validate ------->');
      const index = validateIndex.value += 1

      // const valid = validatorRef.value.validate(props.schema, props.value) as boolean
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate
      )

      if(index !== validateIndex.value) return
      console.log('end validate ------->');

      errorSchemaRef.value = result.errorSchema

      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }

    watch(()=>props.contextRef,()=>{
      if (props.contextRef) {
        props.contextRef.value = {
          doValidate(){
            return new Promise((resolve)=>{
              validateResolveRef.value = resolve
              doValidate()
            })
          }
        }
      }
    },{immediate:true})

    provide(SchemaFormContextKey, context) //provide的数据并不会自动变为响应式的 除非你讲其用reactive() 进行包裹

    return () => {
      const {schema, value, uiSchema} = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          uiSchema={uiSchema || {}}
          errorSchema={errorSchemaRef.value || {}}

        />
      )
    }
  }
})
