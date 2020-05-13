const protobuf = require('protobufjs/light')
const pako = require('pako')
const path = require('path')
const svgaDescriptor = require('./desc.json')

/**
 * 解析 svga 文件
 * @param {Uint8Array} input 
 */
module.exports = function parse(input) {
  let svga
  try {
    // const root = protobuf.loadSync(path.resolve(__dirname, '..', 'svga.proto'))
    const root = protobuf.Root.fromJSON(svgaDescriptor)
    svga = root.lookupType('com.opensource.svga.MovieEntity')
  } catch (e) {
    console.log('get svga fail')
  }
  
  let data
  try {
    data = svga && svga.decode(
      pako.inflate(input)
    )
  } catch (e) {
    console.log('pako fail', e)
    return
  }
  const images = {}
  Object.keys(data.images).forEach(key => {
    const ele = data.images[key]
    images[key] = Buffer.from(ele).toString('base64')
  })
  data.images = images
  return data
}