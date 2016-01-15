/**
 * Created by chenyao on 15/10/26.
 */
(function(app, undef) {
    app.extendView({
        name : 'validBonusView',
        el: 'article.valid',
        template : './templates/validBonus.tpl',
        pageno : 1,

        plugins: {
            domevent: true
        },


        _getNextPage : function(callback) {
            var that = this,
                pageno = that.pageno,
                url = AllUrl.bonusUrl+"status=1&queryType=1&page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    debugger;
                    var result = json.data,
                        arr = result.acctCouponList,
                        len = arr.length;
                    if(len == 0){
                        var alert = {
                            body: '<p>已显示全部</p>',
                            buttons: {
                                action: {
                                    title: '确定',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                        return;
                    }else{
                        callback(result);
                    }


                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.bonusUrl+"status=1&queryType=1&page="+1;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json);
                    var result = json.data;
                    callback(result);
                }
            });
        },

        render : function(callback) {
            var that = this;
            that._getPageOne(function(datas) {
                var html = that.template(datas);
                that.$el.html(html);
                callback && callback();
            });
        },

        renderMore : function(callback) {
            var that = this;
            that.pageno++;
            that._getNextPage(function(datas) {
                var html = that.template(datas);
                if(datas.acctCouponList.length == 0){
                    that.$el.html("<div class='noData'>暂无可用红包</div>");
                }else{
                    that.$el.html(html);
                }
                callback && callback();
            });
        },

        destroy : function() {
            // implement super.destory
        }
    });

})(window['app']);
