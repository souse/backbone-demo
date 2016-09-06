define(function (require, exports, module) {
    var partial = require('./templates/index.html');

    module.exports = Backbone.View.extend({
        tagName: 'div',
        _template:_.template(partial),
        events:{},
        initialize:function (options) {
            var self = this;

            self.parent = options['parent'];
            self.render();
        },
        render:function () {
            this.parent.$el.html(this.el);
            this.$el.html(this._template());
        },
        destroy:function () {
            this.undelegateEvents();
            this.remove();
        }
    }); 
});
