let api = {}
if (process.env.NODE_ENV === 'production') {
  api = require('./api.prod').default
} else {
  api = require('./api.dev').default
}

export default (url) => {
  for (let key in api) {
    const reg = new RegExp(`^/?:${key}`)
    if (reg.test(url)) {
      return url.replace(reg, api[key])
    }
  }
  return url
}
