/* @flow */
import minimist from 'minimist'
import { anyPass, compose, has, head, omit, partial, prop } from 'ramda'

const defaultOpts = {
  boolean: ['help', 'version'],
  string: ['config'],
  alias: {
    h: 'help',
    V: 'version'
  }
}

const help = `

  Usage: rbs [options] <command>

Options:

  --help      Output usage information.
  --version   Output the version number.

`

export const log = (message) => console.log(message)
export const exit = (code = 0) => process.exit(code)
export const hasHelp = anyPass([has('help'), has('h')])
export const hasVersion = anyPass([has('version'), has('v')])

export function parseArgs (argv) {
  const pkg = require('../package')
  const args = minimist(argv)
  const showHelp = partial(log, [help])
  const showVersion = partial(log, [pkg.version])

  if (hasHelp(args)) {
    showHelp()
    exit()
  }

  if (hasVersion(args)) {
    showVersion()
    exit()
  }

  return {
    command: compose(head, prop('_'))(args),
    input: omit(['_'], args),
    help
  }
}
