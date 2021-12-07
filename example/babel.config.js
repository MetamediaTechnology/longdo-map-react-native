module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-env', { "targets": "iOS >= 11, Android >= 56" }],
    ],
  };
};
