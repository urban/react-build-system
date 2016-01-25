/* @flow */
import defaultConfig from './default-config'
import getConfig from '@urban/webpack-config'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { exit, log } from './cli-helper'

export default function build ({ config: userConfig }) {
  const config = merge(
    getConfig(defaultConfig),
    {
      output: { publicPath: '' },
      devTools: 'inline-source-map'
    },
    userConfig
  )

  const compiler = webpack(config)

  compiler.run((err, stats) => {
    if (err) {
      log('Build Error:', err)
      exit(1)
    }

    log('Build success!')
    exit(0)
  })
}
