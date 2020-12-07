import {defineComponent, PropType} from 'vue'
import {FiledPropsDefine} from "../types";

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup(props){
    const handleChange = (e: any) => {
      const value = e.target.value;
      const num = Number(value);

      if (Number.isNaN(num)) {
        props.onChange(undefined);
      }else {
        props.onChange(num)
      }
    };

    return () => <input type="number" value={props.value as any} onInput={handleChange}/>
  }
})
