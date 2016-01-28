/* @flow */

import { join, resolve } from 'path'
import HtmlPlugin from '@urban/webpack-html-plugin'
import getHtml from './get-html'
import getBabelConfig from './get-babel-config'

export const PORT = process.env.PORT || 3000
export const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${PORT}/`

const getDefaultConfig = (): Object => {
  const root = resolve('.')
  // Flow wants a string literal
  // $FlowFixMe
  const { main } = require(join(root, 'package'))

  const config = {
    context: process.cwd(),
    entry: join(process.cwd(), main),
    output: {
      path: join(root, 'dist'),
      publicPath: PUBLIC_URL
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          include: process.cwd(),
          query: getBabelConfig()
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

  return config
}

export default getDefaultConfig
