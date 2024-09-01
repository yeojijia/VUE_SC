module.exports = {
  env: {

    browser: true,
    // es2021: true,
    es6: true,
    commonjs: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/require-default-prop": "off",
    'vue/html-closing-bracket-newline': 'off',
  },
  'globals': {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
}