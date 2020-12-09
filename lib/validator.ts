import Ajv from 'ajv';
// @ts-ignore
import i18n from 'ajv-i18n';
import toPath from 'lodash.topath'

import {Schema} from './types';

interface TransformedErrorObject {
  name: string,
  property: string,
  message: string | undefined,
  params: Ajv.ErrorParameters,
  schemaPath: string
}

interface ErrorSchemaObject {
  [level: string]: ErrorSchema
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors: string[]
}

function toErrorSchema(errors: TransformedErrorObject[]){
  if(errors.length<1) return {};

  return errors.reduce((errorSchema,error)=>{
    const {property, message} = error
    const path = toPath(property) //  /obj/a ---> [obj,a]
    let parent = errorSchema

    //If the property is at the root (.level1) then toPath creates
    //an empty array element at the first index. Remove it.
    if (path.length > 0 && path[0] === '') {
      path.splice(0,1)
    }

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }

    if(Array.isArray(parent.__errors)){
      // We store the list of errors for this node in a property named _errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message || '')
    }else {
      if (message) {
        parent.__errors = [message]
      }
    }

    return errorSchema
  },{} as ErrorSchema)
}

function transformErrors(errors: Ajv.ErrorObject[] | null | undefined) {
  if(errors === null || errors === undefined) return []

  return errors.map(({message, dataPath, keyword, params, schemaPath}) => {
    return {
      name: keyword,
      property: `${dataPath}`,
      message,
      params,
      schemaPath
    }
  });
}

export function validatorFormData(
  validator: Ajv.Ajv,
  formData: any,
  schema: Schema,
  locale: string = 'zh'
) {
  let validationError = null;

  try {
    validator.validate(schema, formData)
  }catch (err) { //如果↑validator.validate(schema, formData)的schema是有问题的,这里会报错
    validationError = err
  }

  i18n[locale](validator.errors)
  let errors = transformErrors(validator.errors)

  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError.message
      } as TransformedErrorObject
    ]
  }

  //@ts-ignore
  const errorSchema = toErrorSchema(errors);

  return {
    errors,
    errorSchema,
    valid: errors.length === 0
  }
}
