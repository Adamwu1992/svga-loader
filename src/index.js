const parse = require('./parser/index')
const { getOptions } = require('loader-utils')
const validate = require('schema-utils')
const schema = require('./schema.json')

module.exports = function(source) {
  const options = getOptions(this)
  validate(schema, options)
  const output = parse(source)
  const isEsModule = options.module !== 'cjs'
  return `${isEsModule ? 'export default' : 'module.exports ='} ${JSON.stringify(output)}`
}

module.exports.raw = true;