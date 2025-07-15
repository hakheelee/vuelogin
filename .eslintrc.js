module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/vue3-essential', '@vue/standard', 'eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 'off',
        // 'no-unused-vars': 'warn', // 경고를 켜고 싶으면 이 줄을 활성화
        'no-unused-vars': 'off', // 사용하지 않는 변수 경고 비활성화
        semi: ['error', 'always']
    }
};
