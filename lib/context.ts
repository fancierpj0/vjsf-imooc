import {inject, reactive, Ref} from 'vue'
import {CommonFieldType, CommonWidgetDefine, Theme} from "./types";

export const SchemaFormContextKey = Symbol()

export function useVJSFContext(){
  const context: { SchemaItem: CommonFieldType, formatMapRef: Ref<{[key:string]:CommonWidgetDefine}> } | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error(`SchemaForm should be used`)
  }

  return context
}
