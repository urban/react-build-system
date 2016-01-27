/* @flow */
const getBabelConfig = (): Object => ({
  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-stage-0'),
    require.resolve('babel-preset-react')
  ],
  plugins: [
    [require.resolve('babel-plugin-react-transform'), {
      transforms: [{
        transform: require.resolve('react-transform-hmr'),
        imports: ['react'],
        locals: ['module']
      }, {
        transform: require.resolve('react-transform-catch-errors'),
        imports: ['react', require.resolve('redbox-react')]
      }]
    }]
  ]
})

export default getBabelConfig
