/**
 * Created by chenyao on 15/10/30.
 */
(function(app, undef) {
    app.extendView({
        name : 'earnDayView',
        el: 'div.dayEarn',
        template:'{{#dayEarnslist}}<span class="earnRecord" data-total="{{totalDailyEarn}}元">{{earnDay}}</span>{{/dayEarnslist}}',
        pageno : 1,

        plugins: {
            domevent: true
        },


        _getNextPage : function(callback) {
            var that = this,
                pageno = that.pageno,
                url = AllUrl.earnDay+"page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    debugger;
                    var result = json.data,
                        arr = result.ordEarnslist || [],
                        len = arr.length || 0;
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
                url = AllUrl.earnDay+"page="+1;

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
                console.log(html);
                that.$el.append(html);
                callback && callback();
            });
        },

        destroy : function() {
            // implement super.destory
        }
    });

})(window['app']);
