/**
 * Created by chenyao on 15/10/28.
 */
//set font
!function(x) {
    var FONTSIZE = 20,
        WIDTH = 320,
        dynamicW = document.body.scrollWidth,
        xFontSize = Math.floor((dynamicW/WIDTH)*20);
    $("html").css("fontSize",xFontSize);

}(window);
//bengin app
app.start({

});
app.navigation.setToolbar({
    html: '<nav class="footnav" id="foot-nav">' +
    '<a class="reco-cur" href="/index.html?" dataid="reco">首页</a>' +
    ' <a class="supe" href="/index.html?#/supe" dataid="supe">理财推荐</a>' +
    ' <a class="asse" href="" dataid="asse">我的账户</a> ' +
    '<a class="more" href="/index.html?#/more" dataid="more">更多</a> ' +
    '</nav>', // html
    height: 50
});
//导航
$("footer").on("click","a",function(e){
    e.preventDefault();
    $("footer a").each(function(i){
        var item = $("footer a")[i];
        item.className = item.className.split("-")[0];
    });

    var curName = this.className;
    this.className = curName+"-cur";

    if(curName === "asse"){
        e.preventDefault();
        //我的账户，通过cookie判断是否登录
        var flag = false;
        var cookies = document.cookie.split(";");
        for(var i= 0,l=cookies.length;i<l;i++){
            var item = cookies[i];
            if(item.indexOf("userId") !== -1){
                var userId = item.substring(item.indexOf("=")+1);
                if(userId !== ""){
                    flag = true;
                }
            }
        }

        if(flag){
            //已登录显示我的资产
            window['app'].navigation.push("/asse");
        }else{
            window['app'].navigation.push("/login");
        }
    }else{
        window['app'].navigation.push("/"+curName);
    }
})