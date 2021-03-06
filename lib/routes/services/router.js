var express = require('express');
var common = require('../../util/common.js');
var log = require('../../util/log').get();

var fhmbaasMiddleware = require('fh-mbaas-middleware');

var handlers = require('./handlers');

var router = express.Router({
  mergeParams: true
});

//Getting The Relevant Environment Database.
router.use(fhmbaasMiddleware.envMongoDb.getOrCreateEnvironmentDatabase);

router.get('/', handlers.list);

router.get('/:guid', handlers.get);

router.delete('/:guid', handlers.remove);

router.post('/:guid/deploy', handlers.deploy);

//jshint unused:false
router.use(function(err, req, res, next){
  log.logger.error("Error In Service Request", err );
  return common.handleError(err, "Service Error", 500, req, res);
});

module.exports = router;
