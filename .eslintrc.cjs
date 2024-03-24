module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {ecmaVersion: 'latest', sourceType: 'module', viteConfig: "vite.config"},
    settings: {react: {version: '18.2'}},
    plugins: ['react-refresh'],
    rules: {
        "react/jsx-no-target-blank": 0,
        "react/prop-types": 0,
        "no-undef": 0,
        "react-hooks/rules-of-hooks": 0,
        "react-refresh/only-export-components":0,
        "react-hooks/exhaustive-deps":0
    },
}
