const Ajv = require('ajv');

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            // minLength: 10,

            test: true  /** ←←←←←←*/
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

//https://ajv.js.org/custom.html

/** 法一*/
/*ajv.addKeyword('test',{
    validate(schema, data){
        console.log(typeof schema); //boolean； 即原本是什么类型 就是什么类型
        console.log(`schema:${schema},data:${data}`);
        //schema:true,data:ahhh

        if(schema === true)return true

        return schema.length===6
    }
})
*/


/** 法二*/
// ajv.addKeyword('test',{
//     /** 调用 ajv.compile 时会调用下面的compile回调
//      * 其return的函数 才是调用validate()时调用的函数*/
//     compile(schema,parentSchema/*←当前keyword所处schema节点*/){
//         console.log(`schema: ${schema},parentSchema: ${JSON.stringify(parentSchema)}`) //schema: true,parentSchema: {"type":"string","test":true}
//         return ()=>true //←这里return的函数会在validate时调用
//     }
// })


/** 法三
 * 使用一个关键字组合多个通用的*/
ajv.addKeyword('test',{
    macro(){
        return {
            minLength: 10
        }
    }
})
/*
[
  {
    keyword: 'minLength',
    dataPath: '.name',
    schemaPath: '#/properties/name/minLength',
    params: { limit: 10 },
    message: 'should NOT be shorter than 10 characters'
  },
  {
    keyword: 'test',
    dataPath: '.name',
    schemaPath: '#/properties/name/test',
    params: { keyword: 'test' },
    message: 'should pass "test" keyword validation'
  }
]
* */


/** metaSchema*/
// ajv.addKeyword('test', {
//     /** ↓这个定义的是 我们自定义关键字 所接受的值的类型*/
//     metaSchema: {
//         // type: 'string'
//         type: 'boolean'
//     },
//
//     compile(schema,parentSchema/*←当前keyword所处schema节点*/){
//         console.log(`schema: ${schema},parentSchema: ${JSON.stringify(parentSchema)}`) //schema: true,parentSchema: {"type":"string","test":true}
//         return ()=>true //←这里return的函数会在validate时调用
//     }
// })

// Error: keyword schema is invalid: data should be string

//todo https://ajv.js.org/custom.html#define-keyword-with-inline-compilation-function

const validate = ajv.compile(schema)
const valid = validate({
    name: 'ahhh',
    age: 18,
    pets: [
        'mimi',
        'heihei'
    ],
    isWorker: true
})

if (!valid) console.log(validate.errors);
