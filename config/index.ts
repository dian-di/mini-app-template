import path from 'node:path'
import { type UserConfigExport, defineConfig } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack'
import devConfig from './dev'
import prodConfig from './prod'

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export default defineConfig<'webpack5'>(async (merge, {}) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'weapp-template',
    date: '2025-4-25',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    alias: {
      '@/components': path.resolve(__dirname, '..', 'src/components'),
    },
    mini: {
      postcss: postcssConfig(),
      webpackChain(chain) {
        webpackChainConfig(chain)
      },
    }
  }

  // process.env.BROWSERSLIST_ENV = process.env.NODE_ENV

  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})

function postcssConfig() {
  return {
    autoprefixer: {
      enable: true,
      config: {},
    },
    pxtransform: {
      enable: true,
      config: {}
    },
    cssModules: {
      enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      config: {
        namingPattern: 'module', // 转换模式，取值为 global/module
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
  }
}

function webpackChainConfig(chain) {
  chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
  chain.resolve.extensions
      .prepend('.taro.tsx') // 最高优先级
  chain.merge({
    plugin: {
      install: {
        plugin: UnifiedWebpackPluginV5,
        args: [
          {
            appType: 'taro',
            // 下面个配置，会开启 rem -> rpx 的转化
            rem2rpx: true,
          },
        ],
      },
    },
  })
}
