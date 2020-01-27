module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "prettier",
    "react-hooks"
  ],
  rules: {
    "prettier/prettier": "error",

    "react/jsx-filename-extension": ["warn", { "extensions": [".jsx", ".js"] }],
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/forbid-foreign-prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/named": "off",

    "no-console": ["error", { "allow": ["tron"] }],
    "no-param-reassign": "off",
    "no-use-before-define": "off",

    "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src"
      },
    },
  },
};
