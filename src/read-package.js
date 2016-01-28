/* @flow */

import { fatal } from './logger'

export default function readPackage (path: string): any {
  try {
    // $FlowFixMe: suppressing this error until...
    return require(path)
  } catch (e) {
    fatal(`File ${path} does not exist.`)
  }
}
