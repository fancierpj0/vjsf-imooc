<template>
  <input type="text" :value="value" @input="handleChange">
</template>

<script setup="props" lang="ts">
  import {ref} from 'vue'
  import {FiledPropsDefine,Schema} from '../types';

  export default {
    props: FiledPropsDefine
  }

  declare const props: {
    value: any,
    onChange: (v: string) => void,
    schema:Schema
  }

  export const handleChange = (e: any) => {
    console.log(e);
    props.onChange(e.target.value)
  };

  //todo 这种方式有bug 编译通不过
</script>

<style scoped>

</style>
