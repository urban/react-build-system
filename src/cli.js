#! /usr/bin/env node
/* @flow */

import { join, isAbsolute } from 'path'
import readPackage from './read-package'
import { fatal, success } from './logger'
import parseArgs from './parse-args'
import { version } from '../package'
import help from './help'
import { compose, evolve, has, isNil } from 'ramda'

const absolutePath = x => isAbsolute(x) ? x : join(process.cwd(), x)

function cli (argv: ?Array<string>): void {
  const { input: command, options, hasHelp, hasVersion } = parseArgs(argv || [])

  if (hasHelp) {
    success(help)
  }
  if (hasVersion) {
    success(version)
  }
  if (isNil(command)) {
    fatal('No command found.')
  }

  const transformations = {
    config: compose(readPackage, absolutePath)
  }
  const opts = evolve(transformations, options)

  let commandPath
  try {
    commandPath = require.resolve(`./commands/${command}`)
  } catch (e) {
    fatal(`Invalid command: ${command}.\n${help}`)
  }

  // $FlowFixMe: suppressing this error until...
  const commandModule = require(commandPath)
  has('default', commandModule)
    ? commandModule.default(opts)
    : commandModule(opts)
}

if (!module.parent) {
  cli(process.argv.slice(2))
}

export default cli
