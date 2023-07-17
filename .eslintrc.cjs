module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        // "plugin:vue/vue3-essential",
        'plugin:vue/essential'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'ecmaFeatures': {
            'modules': true,
            'jsx': true
        },
        // "requireConfigFile": true,
        'parser': '@babel/eslint-parser'
    },
    'plugins': [
        'vue'
    ],
    'rules': {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'eqeqeq': 'off',
        'no-mixed-operators': 'off',
        'semi': ['warn', 'never'], // 禁止尾部使用分号
        // 是否使用单引号
        'quotes': ['warn', 'single'],
        // 函数名和括号之间必须有空格
        'space-before-function-paren': ['warn', 'always'],
        // 对象中的最后一个属性不能有逗号
        'comma-dangle': ['warn', 'never']
    }
}
