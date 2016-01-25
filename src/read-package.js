import { join, resolve } from 'path'
import { existsSync } from 'fs'
import { readJsonSync } from 'fs-extra'
import { exit, log } from './cli-helper'

export default function readPackage (path) {
  if (!existsSync(path)) {
    log(`File ${path} does not exist.`)
    exit(1)
  }

  return readJsonSync(path)
}
