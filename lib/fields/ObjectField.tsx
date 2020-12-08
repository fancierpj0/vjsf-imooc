import {defineComponent, inject, watchEffect} from 'vue'

import {FiledPropsDefine} from "../types";
import {SchemaFormContextKey} from "../context";

// import SchemaItem from "../SchemaItem";
//
// console.log(SchemaItem);

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup() {
    const context: any = inject(SchemaFormContextKey)

    console.log('context:', context);
    watchEffect(() => {
      console.log('context.SchemaItem:', context.SchemaItem);
    })

    return () => {
      const {SchemaItem} = context;

      return <div>Object Field</div>
    }
  }
});
