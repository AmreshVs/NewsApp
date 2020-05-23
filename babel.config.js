module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths:[
          {
            rootPathPrefix: '@src',
            rootPathSuffix: 'src'
          },
          {
            rootPathPrefix: '@comp',
            rootPathSuffix: 'src/components'
          },
          {
            rootPathPrefix: '@const',
            rootPathSuffix: 'src/constants'
          },
          {
            rootPathPrefix: '@lang',
            rootPathSuffix: 'src/lang'
          },
          {
            rootPathPrefix: '@redux',
            rootPathSuffix: 'src/redux'
          },
          {
            rootPathPrefix: '@routes',
            rootPathSuffix: 'src/routes'
          },
          {
            rootPathPrefix: '@screen',
            rootPathSuffix: 'src/screen'
          },
          {
            rootPathPrefix: '@theme',
            rootPathSuffix: 'src/theme'
          },
          {
            rootPathPrefix: '@common',
            rootPathSuffix: 'src/common'
          },
          {
            rootPathPrefix: '@api',
            rootPathSuffix: 'src/api'
          },
          {
            rootPathPrefix: '@hooks',
            rootPathSuffix: 'src/hooks'
          }
        ]
      }
    ]
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-root-import',
          {
            paths:[
              {
                rootPathPrefix: '@src',
                rootPathSuffix: 'src'
              },
              {
                rootPathPrefix: '@comp',
                rootPathSuffix: 'src/components'
              },
              {
                rootPathPrefix: '@const',
                rootPathSuffix: 'src/constants'
              },
              {
                rootPathPrefix: '@lang',
                rootPathSuffix: 'src/lang'
              },
              {
                rootPathPrefix: '@redux',
                rootPathSuffix: 'src/redux'
              },
              {
                rootPathPrefix: '@routes',
                rootPathSuffix: 'src/routes'
              },
              {
                rootPathPrefix: '@screen',
                rootPathSuffix: 'src/screen'
              },
              {
                rootPathPrefix: '@theme',
                rootPathSuffix: 'src/theme'
              },
              {
                rootPathPrefix: '@common',
                rootPathSuffix: 'src/common'
              },
              {
                rootPathPrefix: '@api',
                rootPathSuffix: 'src/api'
              },
              {
                rootPathPrefix: '@hooks',
                rootPathSuffix: 'src/hooks'
              }
            ]
          }
        ]
      ]
    }
  }
};
