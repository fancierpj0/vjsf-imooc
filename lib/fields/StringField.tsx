import {defineComponent, PropType, computed} from 'vue'

import {FiledPropsDefine, CommonWidgetNames} from '../types';
import {getWidget} from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props){
    const TextWidgetRef = computed(()=>{
      const widgetRef =  getWidget(CommonWidgetNames.TextWidget, props.uiSchema)
      return widgetRef.value
    })

    const handleChange = (v: string) => {
      props.onChange(v)
    };

    return ()=>  {
      const {rootSchema,errorSchema,...rest} = props
      const TextWidget = TextWidgetRef.value

      console.log('StringField errorSchema:',errorSchema);
      return <TextWidget {...rest} onChange={handleChange} errors={errorSchema.__errors}/>
    }
  }
})
