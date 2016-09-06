define('widget/modules/select/dbselect',['widget/modules/dialog/dialog'],function(require, exports, module) {
    var dialog = require('widget/modules/dialog/dialog');
    /**
     * 多选弹出窗
     * @type {Object}
     */
    var dbSelect = function(options) {
        this.init(options);
    }

    dbSelect.prototype = {
        init: function(options) {
            var self = this;

            self.opts = $.extend(true, {}, self.defaults, options);
            // self._html = self._createHtm();
            self._bindEvent();
        },
        _createHtm: function() {
            var self = this;
            var opts = self.opts;

            var datas = opts.datas, nbcols = opts.nbcols;
            var width = 150 * nbcols + 30; //包含一般滚动轴宽度

            var checkedList, checkBox, divHtm, ul, li = '';

            // 获取隐藏域信息
            checkedList = $(opts.id).find('input[type="hidden"]').val().split(',');

            $.each(datas, function(index, obj) {
                // 判断checkbox是否选中
                if ($.inArray(obj.id + '', checkedList) > -1) {
                    checkBox = '<input type="checkbox" class="check-item" data-name="'+ obj.name +'" id="'+ obj.id +'" checked="checked">';
                } else {
                    checkBox = '<input type="checkbox" class="check-item" data-name="'+ obj.name +'" id="'+ obj.id +'">';
                };
                li += '<li class="ui-li">' +
                    '<div class="ui-li-control">' +
                        '<div>' + checkBox +
                        '</div>' +
                        '<label for="'+ obj.id +'">'+ obj.name +'</label>' +
                    '</div>' +
                '</li>';
            });
            ul = '<ul>'+ li +'</ul>';
            divHtm = '<div class="ui-combo-control" style="width: '+ width +'px;">'+ ul +'</div>';

            return divHtm;
        },
        _bindEvent: function() {
            var self = this;
            var opts = self.opts;
            var callbackFn = opts.callback;
            var $ellipsisCls = $(opts.id).find('.'+opts.ellipsisCls);

            $ellipsisCls.unbind('click');
            $ellipsisCls.on('click', function(e) {
                e.preventDefault();
                // html保持最新
                var _html = self._createHtm();
                dialog({
                    title: opts.title,
                    content: _html,
                    button: [{
                            value: '确定',
                            callback: function() {
                                var $node = $(this.node);
                                var $checkbox = $node.find('.check-item');

                                var $inputTxt = $(opts.id).find('input[type="text"]');
                                var $inputHide = $(opts.id).find('input[type="hidden"]');
                                var txt = ids = '';

                                $checkbox.each(function(index, val) {
                                    var $_this = $(val);

                                    if($_this.is(':checked')) {
                                        ids += $_this.attr('id') + ',';
                                        txt += $_this.data('name') + ',';
                                    }
                                });
                                ids = ids.substring(0, ids.length - 1);
                                txt = txt.substring(0, txt.length - 1);

                                $inputTxt.val(txt);
                                $inputHide.val(ids);

                                callbackFn && callbackFn.call(this, ids);
                            }
                        },{
                            class: 'btn-default',
                            value: '取消'
                        }]
                }).show();
            });
        },
        defaults: {
            title: '请选择',
            nbcols: 1, //默认列数
            datas: [],
            wrapCls: 'ui-combo-wrap', //外层父级dom
            ellipsisCls: 'ui-combo-ellipsis', //... dom
            inputCls: 'input-txt',
            id: undefined,
            width: 170,
            height: 225,
            callback: null
        }
    };

    module.exports = dbSelect;
});