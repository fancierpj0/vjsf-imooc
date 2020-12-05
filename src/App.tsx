import { createApp, defineComponent, h, reactive, ref, Ref } from 'vue'
import { createUseStyles } from 'vue-jss'

import ManacoEditor from './components/ManacoEditor'

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const schema = {
  type: 'string',
}

const useStyles = createUseStyles({
  editor: {
    minHeight: 400
  }
})

export default defineComponent({
  setup() {
    const schemaRef: Ref<any> = ref(schema)

    const handleCodeChange = (code: string) => {
      let schema: any
      try {
        schema = JSON.parse(code)
      } catch (e) {
          //
      }

      schemaRef.value = schema
    }

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value
      const code = toJson(schemaRef.value)

      return (
        <div>
          <ManacoEditor
            code={code}
            onChange={handleCodeChange}
            title="Schema"
            class={classes.editor}
          />
        </div>
      )
    }
  }
})
