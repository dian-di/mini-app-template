// postcss.config.js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    'postcss-import': {},
    'postcss-rem-to-responsive-pixel': {
      // 32 意味着 1rem = 32rpx
      rootValue: 32,
      // 默认所有属性都转化
      propList: ['*'],
      // 转化的单位,可以变成 px / rpx
      transformUnit: 'rpx', // 转化的单位,可以变成 px / rpx
    },
  },
}
