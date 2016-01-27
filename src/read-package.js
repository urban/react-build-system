/* @flow */

import { existsSync } from 'fs'
import { readJsonSync } from 'fs-extra'
import { exit, log } from './cli-helper'

const noFile = (path) => {
  log(`File ${path} does not exist.`)
  exit(1)
}

export default function readPackage (path: string): Object {
  if (!existsSync(path)) noFile(path)
  return readJsonSync(path)
}
