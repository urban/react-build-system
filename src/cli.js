#! /usr/bin/env node
/* @flow */

import { join, isAbsolute } from 'path'
import readPackage from './read-package'
import { exit, log, parseArgs } from './cli-helper'
import { version } from '../package'
import help from './help'
import { compose, evolve, has, isNil } from 'ramda'

const absolutePath = x => isAbsolute(x) ? x : join(process.cwd(), x)

const noCommand = () => {
  log('No command found.')
  exit(1)
}

const unknownCommand = (command) => {
  log(`Invalid command: ${command}.`)
  log(help)
  exit(1)
}

const showHelp = () => {
  log(help)
  exit(0)
}
const showVersion = () => {
  log(version)
  exit(0)
}

function cli (argv: ?Array<string>): void {
  const { command, input, hasHelp, hasVersion } = parseArgs(argv || [])

  if (hasHelp) showHelp()
  if (hasVersion) showVersion()
  if (isNil(command)) noCommand()

  const transformations = {
    config: compose(readPackage, absolutePath)
  }
  const options = evolve(transformations, input)

  let commandPath
  try {
    commandPath = require.resolve(`./commands/${command}`)
  } catch (e) {
    unknownCommand(command)
  }

  // $FlowFixMe: suppressing this error until...
  const commandModule = require(commandPath)
  has('default', commandModule)
    ? commandModule.default(options)
    : commandModule(options)
}

if (!module.parent) {
  cli(process.argv.slice(2))
}

export default cli
