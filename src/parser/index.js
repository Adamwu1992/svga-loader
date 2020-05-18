const VideoEntity = require('./VideoEntity')
const parse = require('./core')

module.exports = function(source) {
  if (typeof source === 'string') {
    source = Buffer.from(source)
  }
  const data = parse(source)
  return data && new VideoEntity(data)
}