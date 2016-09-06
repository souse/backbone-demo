define(function (require, exports, module) {
    var HomeView = require('home');
    var Router = require('router');

    module.exports = function() {
    	new Router(new HomeView({ router: this }));
    	Backbone.history.start({pushState: false});
    } 
});