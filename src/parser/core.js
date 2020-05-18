const protobuf = require('protobufjs/light')
const pako = require('pako')
const path = require('path')
const svgaDescriptor = require('./desc.json')

/**
 * 解析 svga 文件
 * @param {Uint8Array} input 
 */
module.exports = function parse(input) {
  const root = protobuf.Root.fromJSON(svgaDescriptor)
  const svga = root.lookupType('com.opensource.svga.MovieEntity')
  let data
  try {
    data = svga && svga.decode(
      pako.inflate(input)
    )
  } catch (e) {
    console.error(e)
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