module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript'
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        semi: [
            2,
            'always'
        ],
        indent: 'off',
        'vue/script-indent': ['warn', 4, {
            baseIndent: 1
        }],
        'vue/html-indent': ['warn', 4, {
            baseIndent: 1
        }],
        'space-before-function-paren': [
            'error', {anonymous: 'ignore', named: 'never'}
        ],
        'generator-star-spacing': 0,
        'object-curly-spacing': [0, 'always']
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
};
