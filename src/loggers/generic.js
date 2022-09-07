function simpleLogger(request, response, next) {
    console.log(`${request.method} - ${request.url}`);
    next();
}

module.exports.logHitSpecialEndpoint = (request, response, next) => {
    console.log("Hit /special endpoint");
    next();
}
module.exports.simpleLogger = simpleLogger;