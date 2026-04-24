// Workaround: tsx CJS mode converts `import x from 'cjs-module'` to `x = require('cjs-module').default`
// but @next/env (used by payload's loadEnv) has __esModule:true with no .default property.
// Pre-loading it and patching adds .default so tsx's interop works.
;(function patchNextEnv() {
  // Find @next/env from payload's perspective
  const Module = require('module')
  const payloadDir = require.resolve('payload').replace(/\/dist\/.+$/, '')
  const req = Module.createRequire(payloadDir + '/package.json')
  try {
    const m = req('@next/env')
    if (m && !m.default) m.default = m
  } catch (_) {}
})()
