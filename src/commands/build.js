import getDefaultConfig from '../get-default-config'
import getConfig from '@urban/webpack-config'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { exit, log } from '../cli-helper'

const error = (err): void => {
  log('Build Error:', err)
  exit(1)
}

const success = (): void => {
  log('Build success!')
  exit(0)
}

export default function build ({ config: userConfig }: { config: Object }): void {
  const buildConfig = {
    output: { publicPath: '' },
    devTools: 'inline-source-map'
  }
  const config = merge(
    getConfig(getDefaultConfig()),
    buildConfig,
    userConfig
  )
  const compiler = webpack(config)

  compiler.run((err, stats) => {
    if (err) error(err)
    success()
  })
}
