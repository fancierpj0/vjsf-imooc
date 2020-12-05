const Ajv = require('ajv');
const localize = require('ajv-i18n')

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            // minLength: 10,

            test: false  /** ←←←←←←*/
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


const ajv = new Ajv()

ajv.addKeyword('test',{
    //如果是我们自定义的关键字, 默认是不支持多语言的（它输出的message仍然为英文）
    //需要像下面这样做

    validate: function fun(schema, data){
        fun.errors = [
            {
                keyword: 'test',
                dataPath: '.name',
                schemaPath: '#/properties/name/test',
                params: { keyword: 'test' },
                message: '自定义错误信息'
            }
        ]
        return false
    }
})
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
if (!valid) {

    console.log('localize.zh:')
    localize.zh(validate.errors) //只是切换了语言包
    console.log('-----------------------------------------');
    console.log('validate.errors:',validate.errors)
/*
localize.zh:
-----------------------------------------
validate.errors: [
  {
    keyword: 'test',
    dataPath: '.name',
    schemaPath: '#/properties/name/test',
    params: { keyword: 'test' },
    message: 'should pass "test" keyword validation'
  }
]
* */
};
