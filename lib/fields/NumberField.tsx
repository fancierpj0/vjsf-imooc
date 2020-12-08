import {defineComponent} from 'vue'

import {CommonWidgetNames, FiledPropsDefine} from "../types";
import {getWidget} from '../theme';

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup(props){
    const handleChange = (v: string) => {
      const num = Number(v);

      if (Number.isNaN(num)) {
        props.onChange(undefined);
      }else {
        props.onChange(num)
      }
    };

    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)

    return () => {
      const {schema,rootSchema,...rest} = props
      const NumberWidget = NumberWidgetRef.value;
      return <NumberWidget {...rest} onChange={handleChange}/>
    }
  }
})
