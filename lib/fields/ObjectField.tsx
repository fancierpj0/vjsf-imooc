import {defineComponent, inject, watchEffect, DefineComponent, ExtractPropTypes} from 'vue'

import {CommonFieldType, FiledPropsDefine} from "../types";
import {SchemaFormContextKey, useVJSFContext} from "../context";
import {isObject} from "../utils";

// import SchemaItem from "../SchemaItem";
//
// console.log(SchemaItem);



export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}

      if (v === undefined) {
        delete value[key]
      }else {
        value[key] = v
      }

      props.onChange(value)
    }

    return () => {
      const {schema, rootSchema, value, errorSchema, uiSchema} = props
      const {SchemaItem} = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {};

      console.log('ObjectField errorSchema:',errorSchema);
      console.log(Object.keys(properties));
      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          uiSchema={uiSchema.properties?uiSchema.properties[k]||{}:{}}
          rootSchema={rootSchema}
          value={currentValue[k]}
          errorSchema={errorSchema[k] || {}}
          key={index}
          onChange={(v:any)=>handleObjectFieldChange(k,v)}
        />
      ))
    };
  }
});
