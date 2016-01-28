import getDefaultConfig from '../get-default-config'
import getConfig from '@urban/webpack-config'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { fatal, success } from '../logger'

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
    if (err) {
      fatal(`Build error: ${err}`)
    }
    success('Build success!')
  })
}
