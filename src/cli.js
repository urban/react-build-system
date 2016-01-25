#! /usr/bin/env node

/* @flow */
import { join, isAbsolute } from 'path'
import commands from './commands'
import readPackage from './read-package'
import { exit, log, parseArgs } from './cli-helper'
import { compose, evolve, has } from 'ramda'

const absolutePath = x => isAbsolute(x) ? x : join(process.cwd(), x)

function cli (argv: Array = []): void {
  const { command, help, input } = parseArgs(argv)

  if (command === undefined) {
    log('No command found.')
    exit(1)
  }

  if (!has(command, commands)) {
    log(`Invalid command: ${command}.`)
    log(help)
    exit(1)
  }

  const transformations = {
    config: compose(readPackage, absolutePath)
  }
  const options = evolve(transformations, input)

  commands[command](options)
}

if (!module.parent) {
  cli(process.argv.slice(2))
}

export default cli
