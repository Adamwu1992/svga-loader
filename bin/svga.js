#! /usr/bin/env node

const path = require('path')
const fs = require('fs')
const { Command } = require('commander')
const version = require('../package.json').version
const parse = require('../src/parser')

const program = new Command()
program.version(version)

program
  .option('-D, --dir <dir>', 'parse *.svga in the dir')
  .option('-O, --out <out>', 'output file or dir, depends on input mode')

program.parse(process.argv)

let files = []
const basePath = process.cwd()
const getFileName = filePath => {
  const s = filePath.split(path.sep)
  return s[s.length - 1]
}

if (program.out) {
  // 如果指定了输出目录，判断目录是否存在
  fs.access(path.resolve(basePath, program.out), fs.constants.F_OK, err => {
    if (err) {
      fs.mkdirSync(path.resolve(basePath, program.out))
    }
  })
}

if (program.dir) {
  try {
    const names = fs.readdirSync(path.resolve(basePath, program.dir))
    files = names
      .filter(file => path.extname(file) === '.svga')
      .map(name => {
        const input = path.resolve(basePath, program.dir, name)
        const output = path.resolve(basePath, program.out || program.dir, name.replace('.svga', '.json'))
        return { input, output }
      })
  } catch (e) {
    console.error(e)
    return
  }
} else if (program.args.length > 0) {
  files = program.args
    .filter(file => path.extname(file) === '.svga')
    .map(v => {
      const input = path.resolve(basePath, v)
      const filename = getFileName(v)
      const output = path.resolve(basePath, program.out, filename.replace('.svga', '.json'))
      return { input, output }
    })
} else {
  console.log('You should use --dir or just specify a file.')
  return
}

for (const { input, output } of files) {
  fs.readFile(input, (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const json = parse(data)
    fs.writeFile(output, JSON.stringify(json), err => {
      if (err) {
        console.error(err)
      } else {
        console.log('form: ', input)
        console.log('to:', output)
        console.log()
      }
    })
  })
}
