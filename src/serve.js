/* @flow */
import defaultConfig, { PORT, PUBLIC_URL } from './default-config'
import getConfig from '@urban/webpack-config'
import getEntry from '@urban/webpack-config/lib/get-entry'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { exit, log } from './cli-helper'
import express from 'express'
import historyApiFallback from 'connect-history-api-fallback'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

function serve ({ config: userConfig }) {
  const config = merge(
    getConfig(defaultConfig, true),
    {
      devTools: 'eval'
    },
    userConfig
  )

  config.entry = getEntry(config.entry, [
    require.resolve('webpack-hot-middleware/client')
  ])

  const { output: { path: contentBase, publicPath } } = config
  const compiler = webpack(config)

  const serverOptions = {
    contentBase,
    publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }

  const app = express()
  app.use(historyApiFallback({ verbose: false }))
  app.use(WebpackDevMiddleware(compiler, serverOptions))
  app.use(WebpackHotMiddleware(compiler))
  app.listen(PORT, (err, result) => {
    if (err) {
      log(err)
      exit(1)
    }
    log(`Server started at ${PUBLIC_URL}`)
  })
}

export default serve
