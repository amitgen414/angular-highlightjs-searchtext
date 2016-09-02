/*specify all the node module dependencies to be bundled up*/
module.exports = {
    bundle: {
        vendor: {
            scripts: [
                './bower_components/angular/*.min.js',
                './bower_components/angular-bootstrap/*.min.js',
                './bower_components/highlightjs/*.min.js'
            ]
        }
    }
};