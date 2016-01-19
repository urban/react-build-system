/* @flow */
import { join } from 'path'
import defaultConfig, { PORT, PUBLIC_URL } from './default-config'
import getConfig from '@urban/webpack-config'
import getEntry from '@urban/webpack-config/lib/get-entry'
import webpack from 'webpack'
import merge from 'webpack-merge'

function build (args) {
  const { config: userConfig } = args
  const config = merge(
    getConfig(defaultConfig),
    {
      output: { publicPath: '' },
      devTools: 'inline-source-map',
      ...(userConfig && require(userConfig))
    }
  )

  const { output: { path: contentBase, publicPath } } = config
  const compiler = webpack(config)


  compiler.run((err, stats) => {
    if (err) {
      console.error('Build Error:', err)
      return
    }
    console.log('Build success!')
  })

}

export default build
