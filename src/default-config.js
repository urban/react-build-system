import { join, resolve } from 'path'
import { existsSync } from 'fs'
import { readJsonSync } from 'fs-extra'
import HtmlPlugin from '@urban/webpack-html-plugin'
import getHtml from './get-html'
import babelConfig from './babel-config'
import readPackage from './read-package'
import { exit, log } from './cli-helper'

export const PORT = process.env.PORT || 3000
export const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${PORT}/`

const packageRoot = resolve('.')

const { main } = readPackage(join(packageRoot, 'package.json'))
const outputDir = join(packageRoot, 'dist')

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
        query: babelConfig
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
