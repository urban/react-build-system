/* @flow */

import minimist from 'minimist'
import { anyPass, compose, has, head, omit, prop } from 'ramda'

export const log = (message: string): void => console.log(message)
export const exit = (code: ?number): void => process.exit(code || 0)

export function parseArgs (argv: Array<string>): Object {
  const args = minimist(argv)
  const command = compose(head, prop('_'))(args)
  const input = omit(['_'], args)
  const hasHelp = anyPass([has('help'), has('h')])(args)
  const hasVersion = anyPass([has('version'), has('v')])(args)

  return { command, input, hasHelp, hasVersion }
}
