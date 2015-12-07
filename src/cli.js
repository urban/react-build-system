#! /usr/bin/env node

/* @flow */
import { join, isAbsolute } from 'path'
import minimist from 'minimist'
import { version } from '../package'
import help from './help'
import Commands from '.'

function getConfig({ config }) {
  return isAbsolute(config) ? config : join(process.cwd(), config)
}

function cli (argv: Array = []): void {
  const args = minimist(argv, {
    boolean: ['help', 'version'],
    string: ['config'],
    alias: {
      h: 'help',
      V: 'version'
    }
  })

  if (args.help) {
    return console.log(help)
  }

  if (args.version) {
    return console.log(version)
  }

  const command = argv[0]
  if (!command) {
    console.error('No command found.')
    process.exit(1)
  }
  if (!Commands.hasOwnProperty(command)) {
    console.error(`Invalid command: ${command}.`)
    console.log(help)
    process.exit(1)
  }
  Commands[command]({
    config: getConfig(args)
  })
}

if (!module.parent) {
  cli(process.argv.slice(2))
}

export default cli
