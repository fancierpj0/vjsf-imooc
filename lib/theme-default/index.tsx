import {defineComponent} from 'vue'

import SelectionWidget from './Selection'
import {CommonWidgetPropsDefine, CommonWidgetDefine} from '../types'

const CommonWidget: CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup() {
    return () => null
  }
})

export default {
  widgets: {
    SelectionWidget,
    TextWidget: CommonWidget,
    NumberWidget: CommonWidget
  }
}
