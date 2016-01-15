{{#acctCouponList}}
  <div class="bonus inbonus">
          <ul>                    
              <li>
                  <ul>                            
                      <li class="worth" data-worth="{{price}}" data-cId="{{insCouponId}}">{{price}}
                      <span class="money">元</span>
                      <p>{{shtype}}</p>
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
