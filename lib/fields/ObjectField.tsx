import {defineComponent} from 'vue'

import {FiledPropsDefine} from "../types";

// import SchemaItem from "../SchemaItem";
//
// console.log(SchemaItem);

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup() {
    return () => {
      return <div>Object Field</div>
    }
  }
});
