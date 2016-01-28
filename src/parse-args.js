/* @flow */

import minimist from 'minimist'
import { anyPass, compose, has, head, omit, prop } from 'ramda'

export default function parseArgs (argv: Array<string>): Object {
  const args = minimist(argv)
  const input = compose(head, prop('_'))(args)
  const options = omit(['_'], args)
  const hasHelp = anyPass([has('help'), has('h')])(args)
  const hasVersion = anyPass([has('version'), has('v')])(args)

  return { input, options, hasHelp, hasVersion }
}
