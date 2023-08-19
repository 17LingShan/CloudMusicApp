module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'jotai/babel/preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel']
    }
  },
  plugins: [
    'react-native-reanimated/plugin',
    'jotai/babel/plugin-react-refresh',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '^@/(.+)': './src/\\1'
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js'
        ]
      }
    ]
  ]
}
