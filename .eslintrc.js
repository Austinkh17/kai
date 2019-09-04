module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    'html'
  ],
  "rules": {
    // tab缩进
    'indent': [
      'error',
      'tab'
    ],
    // 单引号引用字符串
    'quotes': [
      'error',
      'single'
    ],
    // 必须使用分号结束
    'semi': [
      'error',
      'always'
    ],
    'space-before-function-paren':0,
    'spaced-comment':0,
    // 允许tab缩进
    'no-tabs': 'off',
    // 关闭===检测
    'eqeqeq': 'off',
    // 允许多行空行
    'no-multiple-empty-lines': 'off',
    // 允许多余空格
    'no-trailing-spaces': 'off',
    // end of file last line
    'eol-last': 'off',
    // promise reject不需要error对象
    'prefer-promise-reject-errors': 'off',
    'keyword-spacing':0,
    'space-before-blocks':0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};