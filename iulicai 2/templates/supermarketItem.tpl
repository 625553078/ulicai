{{#upProductList}}
    <ul data-proId={{productId}}  data-flag={{flag}}>
        <li>
            <span class="title">{{productName}}</span>
            <span class="iconfont"><!-- &#xe621; --></span>
            <span class="iconfont"><!-- &#xe611; --></span>
            <span class="iconfont"><!-- &#xe627; --></span>
            <span class="iconfont" href=""><!-- &#xe60a; --></span>
            <span>{{time}}</span>
        </li>
        <li>
            <span data="年化收益率">{{rate}}%+{{extRate}}%</span>
            <span data="投资期限">{{prodPeriod}}天</span>
            <span data="总金额(元)">{{totalAmount}}</span>
        </li>
       
    <!--<li><div><span class="usedRate" style="width:{{boughtRate}}%"></span><span class="unusedRate" style="width:100%"></span></div>{{boughtRate}}%</li> -->
    </ul>
{{/upProductList}}