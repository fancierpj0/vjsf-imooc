const Ajv = require('ajv');

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            // minLength: 10,
            format: 'test' /** ←←←←←←*/
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

const ajv = new Ajv()

//https://ajv.js.org/#api-addformat
ajv.addFormat('test', data => {
    console.log(data, '------------------');
    return data === 'haha';
});
const validate = ajv.compile(schema)
const valid = validate({
    name:'ahhh',
    age:18,
    pets: [
        'mimi',
        'heihei'
    ],
    isWorker: true
})
/*
ahhh ------------------
[
  {
    keyword: 'format',
    dataPath: '.name',
    schemaPath: '#/properties/name/format',
    params: { format: 'test' },
    message: 'should match format "test"'
  }
]
* */

if (!valid) console.log(validate.errors);
