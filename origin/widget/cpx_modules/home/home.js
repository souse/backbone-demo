define(function (require, exports, module) {
    var HeaderView = require('./header');
    var LeftNavView = require('./leftnav');
    var RightBoxView = require('./right');

    var HomeView = Backbone.View.extend({
        tagName: 'div',
        events:{},
        initialize:function (options) {
            var self = this;

            self.router = options['router'];
            self.header = options['header'] || new HeaderView({ router: self.router});
            self.leftnav = options['leftnav'] || new LeftNavView({ router: self.router});
            self.rightbox = options['rightbox'] || new RightBoxView({ router: self.router});
            self.render();
        },
        render:function () {
            if(!this.isRendered) {
                this.isRendered = true;

                this.$el.addClass('cpx-container').attr('id', 'cpxContainer');
                $('body').append(this.el);
                this.$el.html(this.header.el).append(this.leftnav.el).append(this.rightbox.el);
            }
        },
        destroy:function () {
            this.undelegateEvents();
            this.router = null;
            this.header = null;
            this.body = null;
            this.remove();
            delete this;
        }
    });

    module.exports = HomeView; 
});
