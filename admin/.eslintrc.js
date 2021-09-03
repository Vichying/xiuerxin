module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true 
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],    //, "@vue/prettier"
  parserOptions: {
    parser: "babel-eslint"
  },
  "rules": {
    "no-console": "off",
    "no-unused-vars": [
      0,
      {
        "vars": "local",
        "args": "none"
      }
    ],
    "vue/no-unused-components": "off",
    "no-irregular-whitespace": "off"
  },
};
