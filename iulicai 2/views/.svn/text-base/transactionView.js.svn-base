/**
 * Created by chenyao on 15/10/21.
 */
(function(app, undef) {
    app.extendView({
        name : 'transactionView',
        el: 'div#transactionList',
        template : './templates/transactionView.tpl',
        pageno : 1,

        plugins: {
            domevent: true
        },


        _getNextPage : function(callback) {
            var that = this,
                pageno = that.pageno,
                url = AllUrl.getOrds+"&orderId=189990012872&page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    var result = json.data,
                        arr = result.ordProdDtoList,
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
                        for(var i= 0;i<len;i++){
                            var tmp = arr[i].payStatus;
                            console.log(tmp);
                            if(PayStatus[tmp] !== "undefined"){
                                result.ordProdDtoList[i].payStatus = PayStatus[tmp];
                            }
                        }
                        callback(result);
                    }

                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.getOrds+"&page="+0;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json);
                    var result = json.data,
                        arr = result.ordProdDtoList,
                        len = arr.length;
                    if(len == 0){
                        var alert = {
                            body: '<p>暂无订单。</p>',
                            buttons: {
                                action: {
                                    title: '关闭',
                                    fn: basicModal.close
                                }
                            }
                        }
                        basicModal.show(alert);
                    }

                    for(var i= 0;i<len;i++){
                        var tmp = arr[i].payStatus;
                        console.log(tmp);
                        if(PayStatus[tmp] !== "undefined"){
                            result.ordProdDtoList[i].payStatus = PayStatus[tmp];
                        }
                    }

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
