/**
 * Created by chenyao on 15/10/15.
 */
(function(app, undef) {
    app.extendView({
        name : 'supermarketView',
        el: 'div.rec-content',
        template : './templates/supermarketItem.tpl',
        pageno : 1,

        events: [
            ['click', 'ul', '_itemClickHandler']
        ],

        plugins: {
            domevent: true
        },

        _itemClickHandler : function(e) {
            e.preventDefault();
            var proId = $(e.currentTarget).attr("data-proId");
            app.navigation.push("/productDetails",{
                type:'GET',
                data:{productId:proId}
            });//进入产品详情页面
        },

        _getSearchItems : function(callback) {
            var that = this,
                pageno = that.pageno,
                //url='/wstorm/CLtest/data/supermarket.json';
                url = AllUrl.getProds+"&page="+pageno;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    console.log(json.data);
                    if(json.data.upProductList.length == 0){
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
                        callback(json.data);
                    }

                }
            });
        },

        _getPageOne:function(callback){
            //显示或者更新第一页
            var that = this,
                url = AllUrl.getProds+"&page="+0;

            $.ajax({
                url : url,
                dataType : 'jsonp',
                success : function(json) {
                    callback(json.data);
                }
            });
        },

        render : function(callback) {
            var that = this;
            that._getPageOne(function(datas) {
                var html = that.template(datas);
                if(datas.upProductList.length == 0){
                    that.$el.html("<div class='noData'>暂无理财产品</div>");
                }else{
                    that.$el.html(html);
                }
                that.$el.html(html);
                callback && callback();
            });
        },

        renderMore : function(callback) {
            var that = this;
            that.pageno++;
            that._getSearchItems(function(datas) {
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
