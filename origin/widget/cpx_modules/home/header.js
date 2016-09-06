define(function (require, exports, module) {
    var header = require('./templates/header.html');

    module.exports = Backbone.View.extend({
        tagName: 'div',
        _template:_.template(header),
        events:{},
        initialize: function(options) {
            var self = this;
            
            self.render();
        },
        render: function() {
            this.$el.addClass('f-header');
            this.$el.html(this._template());
        },
        destroy: function() {
            this.undelegateEvents();
            this.router = null;
            this.top = null;
            this.parent = null;
            this.remove();
        }
    });
});