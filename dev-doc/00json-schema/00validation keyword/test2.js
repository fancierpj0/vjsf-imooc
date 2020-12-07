const Ajv = require('ajv');

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            // minLength: 10
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

            //数组长度只有2个 第一项为string 第二项为number
            /*items: [
                {
                    type: 'string'
                },
                {
                    type: 'number'
                }
            ]*/
        },
        isWorker: {
            type: 'boolean'
        }
    },
    required: ['name','age']

    //更多支持的类型 请参看 https://ajv.js.org/keywords.html
};

const ajv = new Ajv
const validate = ajv.compile(schema)


const valid = validate({
    name:'ahhh',
    age: 'aaa',
    pets: [
        'mimi',
        'heihei'
    ],
    isWorker: true
})
/*
[
  {
    keyword: 'type',
    dataPath: '.age',
    schemaPath: '#/properties/age/type',
    params: { type: 'number' },
    message: 'should be number'
  }
]
* */


/*const valid = validate({
    name:'ahhh',
    pets: [
        'mimi',
        'heihei'
    ],
    isWorker: true
})*/
/*
[
  {
    keyword: 'required',
    dataPath: '',
    schemaPath: '#/required',
    params: { missingProperty: 'name' },
    message: "should have required property 'name'"
  }
]
* */

if (!valid) console.log(validate.errors);
