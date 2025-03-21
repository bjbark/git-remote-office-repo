/*
call stock_list_type_1('20190601','20190701')
*/

drop procedure if exists stock_list_type_2 ; 
/*
 전체 창고별 재고를  조회한다. (결과는 창고별로 재고를 분리해서 조회한다.)
*/

CREATE procedure `stock_list_type_2`(
       _wrhs_idcd varchar(50),
       _fr_dt     varchar(50),
       _to_dt     varchar(50)
    )  
return table
as	
begin	

DECLARE _last_yyyymm   VARCHAR(50);

select max(a.clos_yymm) into _last_yyyymm
from   isos_sum a
where  a.clos_yymm < substring(_fr_dt,1,6)
and    ((ifnull(_wrhs_idcd,'') = '') or (a.wrhs_idcd = ifnull(_wrhs_idcd,'')))
;		

return (
with base_stok   as (																						
                    select a.item_idcd , sum(ifnull(a.base_qntt,0)) as base_qntt
					from (
                           select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd 
	                            , a.base_qntt + a.istt_qntt - a.ostt_qntt as base_qntt
                           from   isos_sum a
	                       where  a.clos_yymm = _last_yyyymm
					       and    a.base_qntt + a.istt_qntt - a.ostt_qntt <> 0
                           and    ((ifnull(_wrhs_idcd,'') = '') or (a.wrhs_idcd = ifnull(_wrhs_idcd,'')))
                           union all 
	                       select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
			                      , case invc_dvcd when '1100' then a.qntt
					       	                       when '1200' then a.qntt
					       	                       when '1300' then a.qntt * -1
					       	                       when '1400' then a.qntt
					       	                       when '2100' then a.qntt * -1
					       	                       when '2200' then a.qntt * -1
					       	                       when '2300' then a.qntt * -1
					       	                       when '2400' then a.qntt * -1
					       						   else a.qntt  end as base_qntt
	                       from   isos_book a
	                       where  invc_date >= concat(_last_yyyymm , '31')
					       and    invc_date < _fr_dt
                           and    ((ifnull(_wrhs_idcd,'') = '') or (a.wrhs_idcd = ifnull(_wrhs_idcd,'')))
					) a
                    group by a.item_idcd
                    ),
     istt_1100   as (/*구매입고 */
	                select a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1100')
					and    invc_date between _fr_dt and _to_dt
                    and    ((ifnull(_wrhs_idcd,'') = '') or (a.wrhs_idcd = ifnull(_wrhs_idcd,'')))
					group  by item_idcd
                    ),
     istt_1200   as (/* 기타입고  */
	                select a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1200')
					and    invc_date between _fr_dt and _to_dt
					group  by item_idcd
                    ),
     istt_1300   as (/*입고반품 */
	                select a.item_idcd
					     , sum(a.qntt) as istt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1300')
					and    invc_date between _fr_dt and _to_dt
					group  by item_idcd
                    ),
     move_1400   as (/* 이동입고  */
	                select a.item_idcd
					     , sum(a.qntt) as move_qntt
	                from   isos_book a
	                where  invc_dvcd in ('1400')
					and    invc_date between _fr_dt and _to_dt
					group  by item_idcd
                    ),
     move_2300   as (/* 이동출고 */
	                select a.item_idcd
					     , sum(a.qntt) as move_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2300')
					and    invc_date between _fr_dt and _to_dt
					group  by item_idcd
                    ),
     ostt_2100   as (/* 생산출고 */
	                select a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2100')
					and    invc_date between _fr_dt and _to_dt
					group  by item_idcd
                    ),
     ostt_2200   as (/* 기타출고 */
	                select a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2200')
					and    invc_date between _fr_dt and _to_dt
					group  by item_idcd
                    ),
     ostt_2400   as (/* 재고조정 */
	                select a.item_idcd
					     , sum(a.qntt) as ostt_qntt
	                from   isos_book a
	                where  invc_dvcd in ('2400')
					and    invc_date between _fr_dt and _to_dt
					group  by item_idcd
                    ),
     item       as (/* 품목정보(수불이 발생한 모든 품목코드를 발췌한다. */
	                select a.item_idcd
					from (
	                       select a.bzpl_idcd    , a.wrhs_idcd , a.item_idcd
	                       from   isos_book a
	                       where  invc_date between _fr_dt and _to_dt
					       group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					       union all
	                       select a.bzpl_idcd    , a.wrhs_idcd , a.item_idcd
	                       from   isos_sum a
	                       where  a.clos_yymm = _last_yyyymm
					       group  by a.bzpl_idcd , a.wrhs_idcd , a.item_idcd
					) a 
			        group  by a.item_idcd
					)
select  item.bzpl_idcd      , item.wrhs_idcd      , item.item_idcd
     ,  item_mast.item_name , item_mast.item_spec , item_mast.item_code
     , (select unit_name from unit_mast r where item_mast.item_idcd = r.unit_idcd) as unit_name	 
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
		left outer join item_mast on item.item_idcd = item_mast.item_idcd
);	
END

