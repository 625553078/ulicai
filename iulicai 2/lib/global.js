var ipAddr = "http://cz.iulicai.com:8080/ulicai";
AllUrl={
    registUrl:ipAddr+"/user/register.htm?",//注册
    loginUrl:ipAddr+"/user/login.htm?",//登录
    logout:ipAddr+"/user/logout.htm?",//退出登录
    modPass:ipAddr+"/user/modPwd.htm?",//修改密码
    findPass:ipAddr+"/user/findPwd.htm?",//找回密码
    sendRegCode:ipAddr+"/sms/genRegCode.html?",//发验证码-注册
    sendModCode:ipAddr+"/sms/genModCode.htm?",//发验证码-修改
    sendFindCode:ipAddr+"/sms/genFindCode.htm?",//发验证码-找密码
    acctInfo:ipAddr+"/acct/assertStat.htm",//我的账户
    earnDay:ipAddr+'/acct/dayEarns.htm?',//昨日收益详情
    totalEarns:ipAddr+'/acct/ordEarns.htm?',//累计收益详情
    accDetail:ipAddr+"/acct/books.htm",//账户明细
    bonusUrl:ipAddr+"/acct/acctCoupons.htm?",//优惠券
    getProds:ipAddr+"/prodqry/getprods4page.htm?",//获取所有产品
    getRevenue:ipAddr+"/pay/prosRevenue.htm?",//计算收益
    getOrds:ipAddr+"/order/getorders4page.htm?",//获取所有交易记录
    getCardList:ipAddr+"/pay/infoQuery.htm?operate=query_bankcard_list",//所有已绑定卡号
    bindCard:ipAddr+"/pay/infoQuery.htm?operate=query_card_bin",//绑定银行卡
    pay:ipAddr+"/pay/toPay.htm?"//支付

}

var BonusType = {
    "a":"好友红包",
    "b":"注册红包"
}

var PayStatus = {
    0:"未支付-初始化",
    1:"支付处理中",
    2:"已付款",
    3:"支付失败"
}
//手机号验证
function verifyTel(num){
    var resObj = {
        flag:true
    };
    if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(num))){
        resObj.error = "请输入正确的手机号码";
        resObj.flag = false;
    }
    return resObj;
}
//密码验证
function verifyPass(str){
    var resObj = {
        flag:true
    };
    if(!(/^[a-zA-Z0-9!@#$%^&*()]{6,20}$/.test(str))){
        resObj.error = "密码格式错误";
        resObj.flag = false;
    }
    return resObj;
}

//身份证验证
function verifyIdCard(str){
    var resObj = {
        flag:true
    };
    if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(str))){
        resObj.error = "身份证输入有误";
        resObj.flag = false;
    }
    return resObj;
}

//银行卡验证
function verifyBankCode(num){
    var resObj = {
        flag:true
    };
    if(num.length<16 || num.length >19){
        resObj.error = "银行卡长度必须在16到19位间";
        resObj.flag = false;
    }

    if(!(/^\d*$/.test(num))){
        resObj.error = "银行卡输入有误";
        resObj.flag = false;
    }

    return resObj;
}
//判断cookie是否存在
function getCookieByName(name){
    var cookies = document.cookie.split(";");
    for(var i= 0,l=cookies.length;i<l;i++){
        var item = cookies[i];
        if(item.indexOf(name) !== -1){
            var cvalue = item.substring(item.indexOf("=")+1);
            if(cvalue !== "" && cvalue != 0){
                return true;
            }
            return false;
        }
        return false;
    }
}

//弹出信息提示框
function popWin(msg){
    var bodyStr = '';
    if(msg){
        bodyStr = '<p>'+msg+'</p>';
    }else{
        bodyStr =  '<p>操作成功</p>';
    }
    var alert = {
        body: bodyStr,
        closable: true,
        buttons: {
            action: {
                title: '确定',
                fn: function () {
                    basicModal.close();
                    return;
                }
            }
        }
    }
    basicModal.show(alert);

}
