/* @flow */

import { existsSync } from 'fs'
import { readJsonSync } from 'fs-extra'
import { fatal } from './logger'

export default function readPackage (path: string): Object {
  if (!existsSync(path)) {
    fatal(`File ${path} does not exist.`)
  }
  return readJsonSync(path)
}
