import {CommonWidgetDefine, CommonWidgetPropsDefine} from "../types";
import {defineComponent, nextTick} from "vue";

const TextWidget: CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      // console.log(e);
      // props.onChange(e.target.value)

      /** 实现受控组件 法一*/
      /*nextTick(()=>{
        if (props.value !== e.target.value) {
          e.target.value = props.value
        }
      })*/


      /** 实现受控组件 法二*/
      console.log(e);
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    };

    return ()=>  <input type="text" value={props.value as any} onInput={handleChange}/>
  }
})

export default TextWidget
