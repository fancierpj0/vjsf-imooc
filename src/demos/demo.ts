export default {
  name: 'Demo',
  /*schema: {
    type: 'string',
    minLength: 10,
    title: 'demo'
  },*/

  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: 'password'
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 're try password'
      }
    }
  },

  customValidate(data:any,errors:any){
    console.log(111);
    if (data.pass1 !== data.pass2) {
      console.log(222);
      errors.pass2.addError('密码必须相同')
    }
  },

  uiSchema: {},
  default: 'ahhhhh'
}
