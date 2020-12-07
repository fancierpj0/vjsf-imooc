const Ajv = require('ajv');

const schema = {
    type:'string',
    minLength: 10
}

const ajv = new Ajv
const validate = ajv.compile(schema)


// const valid = validate('test')
/*
[
  {
    keyword: 'minLength',
    dataPath: '',
    schemaPath: '#/minLength',
    params: { limit: 10 },
    message: 'should NOT be shorter than 10 characters'
  }
]
* */

const valid = validate(123)
/*
[
  {
    keyword: 'type',
    dataPath: '',
    schemaPath: '#/type',
    params: { type: 'string' },
    message: 'should be string'
  }
]
* */


if(!valid) console.log(validate.errors);
