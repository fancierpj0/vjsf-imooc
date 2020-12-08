import {inject} from 'vue'
import {CommonFieldType, Theme} from "./types";

export const SchemaFormContextKey = Symbol()

export function useVJSFContext(){
  const context: { theme: Theme, SchemaItem: CommonFieldType } | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error(`SchemaForm should be used`)
  }

  return context
}
