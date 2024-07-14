#!/usr/bin/env node

import { writeFile } from 'fs/promises'
import { cleanFolder } from './func/clean.js'
import { statSync } from 'fs'
import { join } from 'path'

const typesPath = join(process.cwd(), 'types')
const stats = statSync(typesPath)

if (!stats || !stats.isDirectory()) {
  console.error('No types folder found')
  // return
} else {
  const fileMap = await cleanFolder(typesPath)
  for (const file of fileMap) {
    const [path, data] = file
    await writeFile(path, data, 'utf8')
  }
}
