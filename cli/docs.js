#!/usr/bin/env node

import { Application } from "typedoc"

const app = await Application.bootstrapWithPlugins()
const project = await app.convert()

if (project) await app.generateDocs(project, 'docs')
else console.error('No project found')
