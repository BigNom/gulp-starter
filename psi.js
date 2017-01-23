var config  = require('../config')
var gulp    = require('gulp')
// Performance testing plugins
var psi = require('psi');
var wpt = require('webpagetest');
var ngrok = require('ngrok');

// -----------------------------------------------------------------------------
// Performance test: PageSpeed Insights
//
// Initializes a public tunnel so the PageSpeed service can access your local
// site, then it tests the site. This task outputs the standard PageSpeed results.
//
// The task will output a standard exit code based on the result of the PSI test
// results. 0 is success and any other number is a failure. To learn more about
// bash-compatible exit status codes read this page:
//
// http://tldp.org/LDP/abs/html/exit-status.html
// -----------------------------------------------------------------------------
gulp.task('psi', 'Performance: PageSpeed Insights', function() {
  // Set up a public tunnel so PageSpeed can see the local site.
  return ngrok.connect(4000, function (err_ngrok, url) {
    log(c.cyan('ngrok'), '- serving your site from', c.yellow(url));

    // Run PageSpeed once the tunnel is up.
    psi.output(url, {
      strategy: 'mobile',
      threshold: 80
    }, function (err_psi, data) {
      // Log any potential errors and return a FAILURE.
      if (err_psi) {
        log(err_psi);
        process.exit(1);
      }

      // Kill the ngrok tunnel and return SUCCESS.
      process.exit(0);
    });
  });
});
