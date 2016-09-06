define(function (require, exports, module) {
    module.exports = Backbone.View.extend({
        tagName: 'div',
        events:{},
        initialize:function (options) {
            var self = this;

            self.render();
        },
        render:function () {
            this.$el.addClass('cpx-right');
        },
        destroy:function () {
            this.undelegateEvents();
            this.remove();
        }
    }); 
});
