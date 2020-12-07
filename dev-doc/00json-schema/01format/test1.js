const Ajv = require('ajv');

/** format只针对string和number类型有效,并且不同类型的format也不一定都支持以上两种类型 */

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            // minLength: 10,
            format: 'email' /** ←←←←←←*/
        },
        age: {
            type: 'number'
        },
        pets: {
            type: 'array',

            //数组成员数目不限, 成员类型都是string
            items: {
                type: 'string'
            }
        },
        isWorker: {
            type: 'boolean'
        }
    },
    required: ['name','age']
};

const ajv = new Ajv
const validate = ajv.compile(schema)


const valid = validate({
    name:'ahhh',
    pets: [
        'mimi',
        'heihei'
    ],
    isWorker: true
})
/*
[
  {
    keyword: 'format',
    dataPath: '.name',
    schemaPath: '#/properties/name/format',
    params: { format: 'email' },
    message: 'should match format "email"'
  }
]
* */

if (!valid) console.log(validate.errors);
