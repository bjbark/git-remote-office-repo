/*
call stock_close('201906')
*/

drop procedure stock_close ; 

CREATE procedure `stock_close`(
     _yyyymm varchar(50)
    )  
begin	

DECLARE _last_yyyymm   VARCHAR(50);
select max(clos_yymm) into _last_yyyymm
from   isos_sum
where  clos_yymm < _yyyymm
;		

delete from isos_sum
where clos_yymm = _yyyymm;   					
					
insert into isos_sum ( clos_yymm, bzpl_idcd , wrhs_idcd , item_idcd , acct_bacd, base_qntt , istt_qntt , ostt_qntt , stok_qntt
                     , puch_istt_qntt , etcc_istt_qntt , retn_istt_qntt , move_istt_qntt
                     , prod_ostt_qntt , etcc_ostt_qntt , chge_qntt      , move_ostt_qntt					 
					 )
with base_stok   as (																						
                    select bzpl_idcd , wrhs_idcd , item_idcd 
	                     , base_qntt + istt_qntt - ostt_qntt as base_qntt
                    from   isos_sum 
	                where  clos_yymm = _last_yyyymm
					and    base_qntt + istt_qntt - ostt_qntt <> 0
                    ),
     istt_1100   as (/*구매입고 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1100')
					and    substring(invc_date,1,6) = _yyyymm
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     istt_1200   as (/* 기타입고  */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1200')
					and    substring(invc_date,1,6) = _yyyymm
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     istt_1300   as (/*입고반품 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1300')
					and    substring(invc_date,1,6) = _yyyymm
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     move_1400   as (/* 이동입고  */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as move_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1400')
					and    substring(invc_date,1,6) = _yyyymm
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     move_2300   as (/* 이동출고 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as move_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2300')
					and    substring(invc_date,1,6) = _yyyymm
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2100   as (/* 생산출고 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2100')
					and    substring(invc_date,1,6) = _yyyymm
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2200   as (/* 기타출고 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2200')
					and    substring(invc_date,1,6) = _yyyymm
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     ostt_2400   as (/* 재고조정 */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2400')
					and    substring(invc_date,1,6) = _yyyymm
					group  by bzpl_idcd , wrhs_idcd , item_idcd
                    ),
     item       as (/* 품목정보(수불이 발생한 모든 품목코드를 발췌한다. */
	                select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, a.acct_bacd
					from (
	                       select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, i.acct_bacd
	                       from   isos_book a
					              left outer join item_mast i on a.item_idcd = i.item_idcd
	                       where  substring(a.invc_date,1,6) = _yyyymm
					       group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , i.acct_bacd
					       union all
	                       select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd, i.acct_bacd
	                       from   isos_sum a
					              left outer join item_mast i on a.item_idcd = i.item_idcd
	                       where  a.clos_yymm = _yyyymm
					       group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , i.acct_bacd
					) a 
			        group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd , a.acct_bacd
					)
select  _yyyymm as clos_yymm					
     ,  item.bzpl_idcd , item.wrhs_idcd , item.item_idcd	, item.acct_bacd			
	 ,  ifnull(base_stok.base_qntt,0)   as base_qntt
	 ,  ifnull(istt_1100.istt_qntt,0) + ifnull(istt_1200.istt_qntt,0) + ifnull(istt_1300.istt_qntt,0) + ifnull(move_1400.move_qntt,0) as istt_qntt
	 ,  ifnull(ostt_2100.ostt_qntt,0) + ifnull(ostt_2200.ostt_qntt,0) + ifnull(ostt_2400.ostt_qntt,0) + ifnull(move_2300.move_qntt,0) as ostt_qntt
	 ,  ifnull(base_stok.base_qntt,0) 
	 + (ifnull(istt_1100.istt_qntt,0) + ifnull(istt_1200.istt_qntt,0) + ifnull(istt_1300.istt_qntt,0) + ifnull(move_1400.move_qntt,0))
	 - (ifnull(ostt_2100.ostt_qntt,0) + ifnull(ostt_2200.ostt_qntt,0) + ifnull(ostt_2400.ostt_qntt,0) + ifnull(move_2300.move_qntt,0)) as stok_qntt
	 ,  ifnull(istt_1100.istt_qntt,0)   as puch_istt_qntt
	 ,  ifnull(istt_1200.istt_qntt,0)   as etcc_istt_qntt
	 ,  ifnull(istt_1300.istt_qntt,0)   as retn_istt_qntt
	 ,  ifnull(move_1400.move_qntt,0)   as move_istt_qntt
	 
	 ,  ifnull(ostt_2100.ostt_qntt,0)   as prod_ostt_qntt
	 ,  ifnull(ostt_2200.ostt_qntt,0)   as etcc_ostt_qntt
	 ,  ifnull(ostt_2400.ostt_qntt,0)   as chge_qntt
	 ,  ifnull(move_2300.move_qntt,0)   as move_ostt_qntt
from    item
        left outer join base_stok on item.bzpl_idcd = base_stok.bzpl_idcd and item.wrhs_idcd = base_stok.wrhs_idcd and item.item_idcd = base_stok.item_idcd
        left outer join istt_1100 on item.bzpl_idcd = istt_1100.bzpl_idcd and item.wrhs_idcd = istt_1100.wrhs_idcd and item.item_idcd = istt_1100.item_idcd
        left outer join istt_1200 on item.bzpl_idcd = istt_1200.bzpl_idcd and item.wrhs_idcd = istt_1200.wrhs_idcd and item.item_idcd = istt_1200.item_idcd
        left outer join istt_1300 on item.bzpl_idcd = istt_1300.bzpl_idcd and item.wrhs_idcd = istt_1300.wrhs_idcd and item.item_idcd = istt_1300.item_idcd
        left outer join move_1400 on item.bzpl_idcd = move_1400.bzpl_idcd and item.wrhs_idcd = move_1400.wrhs_idcd and item.item_idcd = move_1400.item_idcd
        left outer join move_2300 on item.bzpl_idcd = move_2300.bzpl_idcd and item.wrhs_idcd = move_2300.wrhs_idcd and item.item_idcd = move_2300.item_idcd
        left outer join ostt_2100 on item.bzpl_idcd = ostt_2100.bzpl_idcd and item.wrhs_idcd = ostt_2100.wrhs_idcd and item.item_idcd = ostt_2100.item_idcd
        left outer join ostt_2200 on item.bzpl_idcd = ostt_2200.bzpl_idcd and item.wrhs_idcd = ostt_2200.wrhs_idcd and item.item_idcd = ostt_2200.item_idcd
        left outer join ostt_2400 on item.bzpl_idcd = ostt_2400.bzpl_idcd and item.wrhs_idcd = ostt_2400.wrhs_idcd and item.item_idcd = ostt_2400.item_idcd
;	
END




























