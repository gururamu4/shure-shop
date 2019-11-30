// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Chrome', 'Chrome_without_security'], // You may use 'ChromeCanary', 'Chromium' or any other supported browser

    // you can define custom flags
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security', '--disable-site-isolation-trials']
      }
    }
  })
}