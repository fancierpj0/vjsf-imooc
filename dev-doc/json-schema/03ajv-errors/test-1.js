const Ajv = require('ajv');
const localize = require('ajv-i18n')

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            // test: false,
            minLength: 10,
            errorMessage: {
                type: '必须是字符串',
                minLength: '长度不能小于10'
            }, /** ←←←←←←*/
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
    required: ['name', 'age']
};


const ajv = new Ajv({allErrors:true, jsonPointers: true/** ←←←←←←*/})
require('ajv-errors')(ajv)

ajv.addKeyword('test',{
    macro(){
        return {
            minLength: 10
        }
    }
})
const validate = ajv.compile(schema)
const valid = validate({
    name: 123,
    age:18,
    pets: [
        'mimi',
        'heihei'
    ],
    isWorker: true
})
if (!valid) {

    console.log('localize.zh:')
    localize.zh(validate.errors) //只是切换了语言包
    console.log('-----------------------------------------');
    console.log('validate.errors:',validate.errors)
/*

* */
};
