import {defineComponent, ref, PropType, watch} from 'vue'
import {SelectionWidgetPropsDefine, SelectionWidgetDefine} from '../types';

const SelectionWidget:SelectionWidgetDefine = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup(props){
    const currentValueRef = ref(props.value)

    //todo 写得这么蠢 是要干嘛
    watch(currentValueRef,( newv, oldv )=>{
      if (newv !== props.value) {
        props.onChange(newv)
      }
    })
    watch(()=>props.value,(v)=>{
      if (v !== currentValueRef.value) {
        currentValueRef.value = v
      }
    })

    return () => {
      const {options} = props;
      return (
        <select multiple={true} v-model={currentValueRef.value}>
          {
            options.map(op=><option value={op.value}>{op.key}</option>)
          }
        </select>
      )
    }
  }
})

export default SelectionWidget
