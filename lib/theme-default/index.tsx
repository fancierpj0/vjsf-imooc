import {defineComponent} from 'vue'

import {CommonWidgetPropsDefine, CommonWidgetDefine} from '../types'
import SelectionWidget from './SelectionWidget'
import TextWidget from "./TextWidget";

const CommonWidget: CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup() {
    return () => null
  }
})

export default {
  widgets: {
    SelectionWidget,
    TextWidget,
    NumberWidget: CommonWidget
  }
}
