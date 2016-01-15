   {{#ordProdDtoList}}
    <div class="record">
        <div class="clear">
            <div class="icont">{{daynub}}</div>
            <div class="js-opt allleft">
                <div class="">{{productName}}</div>
                <div class="">{{createDate}}</div>
            </div>
            <div class="js-opt allright">{{money}}</div>
        </div>
        <ul>
            <!-- <li>付款方式 <span>{{bankName}}(尾号{{number}})</span></li> -->
            <li>标的名称 <span>{{productName}}</span></li>
            <li>购买时间 <span>{{createDate}}</span></li>
            <li>起息时间 <span>{{effectiveDate}}</span></li>
            <li>到期时间 <span>{{expireDate}}</span></li>
            <li>购买金额 <span>{{money}}</span></li>
            <li>订单流水号 <span>{{bizOrderId}}</span></li>
            <li>订单状态 <span>{{status}}</span></li>
        </ul>
    </div> 
   {{/ordProdDtoList}}