module.exports = {
  root: true,
  extends: '@react-native-community',
  "eol-last": ["error", "never"],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
