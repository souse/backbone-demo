define(function (require, exports, module) {
    var partial = require('./templates/leftnav.html');

    module.exports = Backbone.View.extend({
        tagName: 'div', 
        _template: _.template(partial),
        events: {},
        initialize: function (options) {
            var self = this;
            
            self.render();
        },
        render: function() {
            this.$el.addClass('cpx-left');
            this.$el.html(this._template());
        },
        destroy: function () {
            this.undelegateEvents();
            this.remove();
        }
    });
});
