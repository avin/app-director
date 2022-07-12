module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:css-modules/recommended',
  ],
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'css-modules'],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'consistent-return': 0,
    'spaced-comment': ['warn', 'always', { markers: ['/'] }],
    curly: ['error', 'all'],
    'no-unused-vars': [1, { args: 'none', ignoreRestSiblings: true }],
    '@typescript-eslint/no-unused-vars': [1, { args: 'none', ignoreRestSiblings: true }],
    'no-underscore-dangle': [
      1,
      {
        allow: ['__REDUX_DEVTOOLS_EXTENSION__', '_paq', '__sentry_xhr__'],
      },
    ],
    'prefer-destructuring': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-console': ['warn', { allow: ['warn', 'error', 'info', 'dir'] }],
    'no-param-reassign': 0,
    'no-void': 0,
    'no-empty': 0,
    'class-methods-use-this': 0,
    // 'consistent-return': 0,
    // 'no-shadow': 0,
    // 'no-new': 0,
    'arrow-body-style': 0,
    'import/order': 0,
    'import/prefer-default-export': 0,
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.fixture.tsx',
          './scripts/**',
          './additional/**',
          './src/cosmos.decorator.tsx',
          './src/setupProxy.js',
        ],
      },
    ],

    // 'react/static-property-placement': 0,
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // 'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    // 'react/jsx-wrap-multilines': ['error', { declaration: false }],
    // 'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/function-component-definition': 0,

    'css-modules/no-unused-class': [
      2,
      {
        markAsUsed: [
          'appear',
          'appearActive',
          'appearDone',
          'enter',
          'enterActive',
          'enterDone',
          'exit',
          'exitActive',
          'exitDone',
        ],
      },
    ],

    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],

    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-empty-interface': 0,

    // Отключаем параноидальные правила TS
    // '@typescript-eslint/no-unsafe-assignment': 0,
    // '@typescript-eslint/no-unsafe-call': 0,
    // '@typescript-eslint/no-unsafe-member-access': 0,

    // '@typescript-eslint/ban-ts-comment': 0,
    // '@typescript-eslint/no-unsafe-return': 0,
    // '@typescript-eslint/no-unsafe-argument': 0,

    // не дружит в react-hook-form
    '@typescript-eslint/unbound-method': 0,

    'no-empty-pattern': 0,

    // Allow "any"
    // '@typescript-eslint/no-explicit-any': 0,
  },
  overrides: [
    {
      files: ['*.fixture.tsx'],
      rules: {
        'react-perf/jsx-no-new-object-as-prop': 0,
        'react-perf/jsx-no-new-function-as-prop': 0,
        'no-console': 0,
      },
    },
  ],
  settings: {
    react: {
      version: require('react/package.json').version,
    },
    'import/resolver': 'webpack',
  },
};
