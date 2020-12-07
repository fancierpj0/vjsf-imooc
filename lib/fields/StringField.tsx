import {defineComponent, PropType} from 'vue'

import {FiledPropsDefine,Schema} from '../types';

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props){

    const handleChange = (e: any) => {
      console.log(e);
      props.onChange(e.target.value)
    };
    return ()=>  <input type="text" value={props.value as any} onInput={handleChange}/>
  }
})
