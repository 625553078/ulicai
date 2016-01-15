{{#acctCouponList}}
           <div class="bonus">
                <ul>                    
                    <li>
                        <ul>                            
                            <li class="worth" data-worth="{{price}}" data-cId="{{insCouponId}}">{{price}}
                            <span class="money">元</span>
                            <!--li>投资{{sum}}元且周期{{minDays}}天及以上使用</li-->
                            <p><!-- 有效期:{{effDate}}至{{expDate}} -->{{expDate}} 过期</p>
                            </li>
                        </ul>
                    </li>
                    <li class="bonusTitle" coupname="{{couponName}}">使用条件</li>
                    <li>· 单笔投资{{shcash}}元以上</li>
                    <li>· 投资周期{{shday}}天以上</li>
                </ul>  
                <div class="dashed"></div>                             
           </div>
{{/acctCouponList}}
{{#unacctCouponList}}
<div class="inbonus">
      <ul>                    
          <li>
              <ul>                            
                  <li class="worth" data-worth="{{price}}" data-cId="{{insCouponId}}">{{price}}
                  <!--li>投资{{sum}}元且周期{{minDays}}天及以上使用</li-->
                  <p><!-- 有效期:{{effDate}}至{{expDate}} -->未满足条件</p>
                  </li>
              </ul>
          </li>
          <li class="bonusTitle" coupname="{{couponName}}">使用条件</li>
          <li>· 单笔投资{{shcash}}元以上</li>
          <li>· 投资周期{{shday}}天以上</li>
      </ul>  
      <div class="dashed"></div>                        
</div>  
{{/unacctCouponList}}