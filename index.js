#!/usr/bin/env node
import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

const projectName = process.argv[2] || 'my-homepage'
const targetDir = path.join(process.cwd(), projectName)

fs.copySync(path.join(__dirname, '..'), targetDir, {
    filter: (src) => !src.includes('node_modules')
})

console.log(`✨ 项目创建成功: ${projectName}`)
console.log(`cd ${projectName} && npm install && npm run dev`)