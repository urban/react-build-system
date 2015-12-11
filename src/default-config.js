import { join, resolve } from 'path'
import { existsSync } from 'fs'
import { readJsonSync } from 'fs-extra'
import HtmlPlugin from '@urban/webpack-html-plugin'
import getHtml from './get-html'

export const PORT = process.env.PORT || 3000
export const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${PORT}/`

const packageRoot = resolve('.')
const packagePath = join(packageRoot, 'package.json')

const hasPackage = existsSync(packagePath)
if (!hasPackage) {
  console.error(`File ${packagePath} does not exist.`)
  process.exit(1)
}

const { main } = readJsonSync(packagePath)
const outputDir = join(resolve('.'), 'dist')

const config = {
  context: process.cwd(),
  entry: join(process.cwd(), main),
  output: {
    path: outputDir,
    publicPath: PUBLIC_URL
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: process.cwd(),
        query: {
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
        }
      }
    ]
  },
  resolveLoader: {
    root: join(__dirname, '..', 'node_modules')
  },
  plugins: [
    new HtmlPlugin((assets, defaultTemplate, compiler) => {
      return {'index.html': getHtml(assets)}
    })
  ]
}
export default config
