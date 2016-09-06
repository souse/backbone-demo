define(function (require, exports, module) {
    var partial = require('./templates/index.html');

    module.exports = Backbone.View.extend({
        tagName: 'div',
        _template: _.template(partial),
        events:{
            
        },
        initialize: function (options) {
            var self = this;

            self.parent = options['parent'];
            if(!self.model) { self.model = new Model(); }
            self.listenTo(self.model, 'change', self.showTable);
            self.render();
        },
        render: function () {
            this.parent.$el.html(this.el);
            this.$el.html(this._template());

            this.model.fetch({ data: this.getSearchData() });
        },
        showTable: function() {
            var md = this.model.toJSON();
            //数据校验 status 0 1
            
            console.log(this.model);
            $('#test').html(_.template(__inline('./templates/table.tpl'))(md.data));    
        },
        getSearchData: function() {
            return {};
        },
        destroy: function () {
            this.undelegateEvents();
            this.remove();
        }
    });

    var Model =  Backbone.Model.extend({
        defaults: {},
        validates: function() {},
        url: '/test/index.json'    
    });
});
