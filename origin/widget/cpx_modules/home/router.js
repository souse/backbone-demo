define(function (require, exports, module) {
    var PathConfig = require('./pathconfig');

    module.exports =  Router = Backbone.Router.extend({
        routes:{//指定url路由
            'index'                      :   'indexHandler',
            'storemg'              :   'storemgHandler'      
        },
        initialize: function(homeView) {
            this.top = homeView;
        },
        indexHandler: function (step) {
            var self = this;

            seajs.use(PathConfig.index, function(IndexView) {
                self.oldView = self.currentView;
                self.currentView = new IndexView({router: self, parent: self.top.rightbox});
                self.destroyView(); 
            });
        },
        storemgHandler: function (step) {
            var self = this;

            seajs.use(PathConfig.storemg, function(storemgView) {
                self.oldView = self.currentView;
                self.currentView = new storemgView({router: self, parent: self.top.rightbox});
                self.destroyView(); 
            });
        },
        destroyView: function() {
            var self = this;
            if(self.oldView) {
                self.oldView.destroy();
                self.oldView = null;
            }
        }
    });
});
