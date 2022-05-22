module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    /* "linebreak-style": [
            "error",
            "windows" 
        ], */
    // WARNING! если выдает много ошибок из-за пробелов (LF/CRLF), 
    //можно раскомментировать правило выше, и закомментировать следующее "linebreak-style"
    //Эти комментарии оставлены только для удобства проверки
    "linebreak-style": [
      "error', 'unix"
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
