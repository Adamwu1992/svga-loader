const VideoEntity = require('./VideoEntity')
const parse = require('./core')

module.exports = function(source) {
  if (typeof source === 'string') {
    source = Buffer.from(source)
  }
  let data
  try {
    data = parse(source)
  } catch (e) {
    console.log('parsr fail')
  }
  console.log('--------')
  console.log(Object.keys(data))
  return data && new VideoEntity(data)
}