<div id="myAccount">
    <section class="accoutWrap">
        <p>您的本息将于投资到期当日24点前到账。</p>
        <div class="assets">
            <span class="i_cash">投资总资产（元）</span>
            <div id="myA-income">
                {{totalAssert}}
                <a href="/index.html#/recharge">
                    <input type="submit" id="rechargeBtn" name="rechargeBtn" value="充值" >
                </a>
            </div>
        </div>
    	<ul>
            <li class="yesEarn">昨日收益（元）<span id="yesEarn">{{totalDailyEarn}}&nbsp;</span></li>       
            <li class="accBalance">
                账户余额（元）
                <a class="mark">&nbsp;&nbsp;&nbsp;&nbsp;<span class="markFrame">您的本息将于投资到期当日24点前到账。</span><span class="markDown">&nbsp;</span></a>
                <span id="yuer">&nbsp;</span>
                <a href="/index.html#/withdraw">
                    <input type="submit" id="drawalsBtn" name="drawalsBtn" value="提现">
                </a>
            </li>
        </ul>                 
    </section>
    <section class="account-nav">
        <ul>            
            <li class="trade iconfont">
                <span class="menu">交易记录</span>
                <span class="iconfont right">&#xf02af;</span>
            </li>
            <li class="bonus iconfont">
                <span class="menu">我的红包</span>
                <span class="iconfont right">&#xf02af;</span>
            </li>            
            <li class="expense iconfont">
                <span class="menu">收支明细</span>
                <span class="iconfont right">&#xf02af;</span>
            </li>  
            </li><div class="line">&nbsp;</div></li> 
            <li class="card iconfont">
                <span class="menu">银行卡管理</span>
                <span class="iconfont right">&#xf02af;</span>
            </li>
            <li class="personal iconfont">
                <span class="menu">个人中心</span>
                <span class="iconfont right">&#xf02af;</span>
            </li>  
            <li class="repay iconfont">
                <span class="menu">还款</span>
                <span class="iconfont right">&#xf02af;</span>
            </li>                      
            <li class="validate iconfont">
                <span class="menu">身份验证</span>
                <span class="iconfont right">
                    <!-- <a id="Completed" class="Completed">已完成</a> -->
                    <a id="Notfinish" class="Notfinish">未完成</a>
                    <span id="Noticon" class="Noticon">&#xf02af;</span>
                </span>
            </li>                     
        </ul>
    </section> 
</div>