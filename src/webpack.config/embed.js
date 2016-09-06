const {optimize:{LimitChunkCountPlugin}} = require('webpack')

module.exports = ({
  embed,
  packagejson={dependencies:{}, devDependencies:{}}
}) => (function (config) {
  if (!embed) return config

  config.output.filename = "[name].embed.js"
  config.entry.libs.map(l => config.entry.app.push(l))

  delete config.entry.libs
  delete config.output.chunkFilename
  delete config.output.libraryTarget

  config.module.loaders.map(loader => {
    if (loader.test && loader.test.exec && loader.test.exec('fake.png')){
      loader.loader = 'url?limit=9999999'
    }
  })

  // config.plugins.push(LimitChunkCountPlugin({maxChunks:1}))

  return config
})
